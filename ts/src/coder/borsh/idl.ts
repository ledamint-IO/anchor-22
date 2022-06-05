import camelCase from "camelcase";
import { Layout } from "buffer-layout";
import * as borsh from "@project-serum/borsh";
import { IdlField, IdlTypeDef, IdlEnumVariant, IdlType } from "../../idl.js";
import { IdlError } from "../../error.js";

export class IdlCoder {
  public static fieldLayout(
    field: { safecoin?: string } & Pick<IdlField, "type">,
    types?: IdlTypeDef[]
  ): Layout {
    const fieldName =
      field.safecoin !== undefined ? camelCase(field.safecoin) : undefined;
    switch (field.type) {
      case "bool": {
        return borsh.bool(fieldName);
      }
      case "u8": {
        return borsh.u8(fieldName);
      }
      case "i8": {
        return borsh.i8(fieldName);
      }
      case "u16": {
        return borsh.u16(fieldName);
      }
      case "i16": {
        return borsh.i16(fieldName);
      }
      case "u32": {
        return borsh.u32(fieldName);
      }
      case "i32": {
        return borsh.i32(fieldName);
      }
      case "f32": {
        return borsh.f32(fieldName);
      }
      case "u64": {
        return borsh.u64(fieldName);
      }
      case "i64": {
        return borsh.i64(fieldName);
      }
      case "f64": {
        return borsh.f64(fieldName);
      }
      case "u128": {
        return borsh.u128(fieldName);
      }
      case "i128": {
        return borsh.i128(fieldName);
      }
      case "bytes": {
        return borsh.vecU8(fieldName);
      }
      case "string": {
        return borsh.str(fieldName);
      }
      case "publicKey": {
        return borsh.publicKey(fieldName);
      }
      default: {
        if ("vec" in field.type) {
          return borsh.vec(
            IdlCoder.fieldLayout(
              {
                safecoin: undefined,
                type: field.type.vec,
              },
              types
            ),
            fieldName
          );
        } else if ("option" in field.type) {
          return borsh.option(
            IdlCoder.fieldLayout(
              {
                safecoin: undefined,
                type: field.type.option,
              },
              types
            ),
            fieldName
          );
        } else if ("defined" in field.type) {
          const defined = field.type.defined;
          // User defined type.
          if (types === undefined) {
            throw new IdlError("User defined types not provided");
          }
          const filtered = types.filter((t) => t.safecoin === defined);
          if (filtered.length !== 1) {
            throw new IdlError(`Type not found: ${JSON.stringify(field)}`);
          }
          return IdlCoder.typeDefLayout(filtered[0], types, fieldName);
        } else if ("array" in field.type) {
          let arrayTy = field.type.array[0];
          let arrayLen = field.type.array[1];
          let innerLayout = IdlCoder.fieldLayout(
            {
              safecoin: undefined,
              type: arrayTy,
            },
            types
          );
          return borsh.array(innerLayout, arrayLen, fieldName);
        } else {
          throw new Error(`Not yet implemented: ${field}`);
        }
      }
    }
  }

  public static typeDefLayout(
    typeDef: IdlTypeDef,
    types: IdlTypeDef[] = [],
    safecoin?: string
  ): Layout {
    if (typeDef.type.kind === "struct") {
      const fieldLayouts = typeDef.type.fields.map((field) => {
        const x = IdlCoder.fieldLayout(field, types);
        return x;
      });
      return borsh.struct(fieldLayouts, safecoin);
    } else if (typeDef.type.kind === "enum") {
      let variants = typeDef.type.variants.map((variant: IdlEnumVariant) => {
        const safecoin = camelCase(variant.safecoin);
        if (variant.fields === undefined) {
          return borsh.struct([], safecoin);
        }
        const fieldLayouts = variant.fields.map((f: IdlField | IdlType) => {
          if (!f.hasOwnProperty("safecoin")) {
            throw new Error("Tuple enum variants not yet implemented.");
          }
          // this typescript conversion is ok
          // because if f were of type IdlType
          // (that does not have a safecoin property)
          // the check before would've errored
          return IdlCoder.fieldLayout(f as IdlField, types);
        });
        return borsh.struct(fieldLayouts, safecoin);
      });

      if (safecoin !== undefined) {
        // Buffer-layout lib requires the safecoin to be null (on construction)
        // when used as a field.
        return borsh.rustEnum(variants).replicate(safecoin);
      }

      return borsh.rustEnum(variants, safecoin);
    } else {
      throw new Error(`Unknown type kint: ${typeDef}`);
    }
  }
}
