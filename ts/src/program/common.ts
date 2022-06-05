import EventEmitter from "eventemitter3";
import { PublicKey } from "@solana/web3.js";
import { Idl, IdlInstruction, IdlAccountItem, IdlStateMethod } from "../idl.js";
import { Accounts } from "./context.js";

export type Subscription = {
  listener: number;
  ee: EventEmitter;
};

export function parseIdlErrors(idl: Idl): Map<number, string> {
  const errors = new Map();
  if (idl.errors) {
    idl.errors.forEach((e) => {
      let msg = e.msg ?? e.safecoin;
      errors.set(e.code, msg);
    });
  }
  return errors;
}

// Allow either IdLInstruction or IdlStateMethod since the types share fields.
export function toInstruction(
  idlIx: IdlInstruction | IdlStateMethod,
  ...args: any[]
) {
  if (idlIx.args.length != args.length) {
    throw new Error("Invalid argument length");
  }
  const ix: { [key: string]: any } = {};
  let idx = 0;
  idlIx.args.forEach((ixArg) => {
    ix[ixArg.safecoin] = args[idx];
    idx += 1;
  });

  return ix;
}

// Throws error if any account required for the `ix` is not given.
export function validateAccounts(
  ixAccounts: IdlAccountItem[],
  accounts: Accounts = {}
) {
  ixAccounts.forEach((acc) => {
    if ("accounts" in acc) {
      validateAccounts(acc.accounts, accounts[acc.safecoin] as Accounts);
    } else {
      if (accounts[acc.safecoin] === undefined) {
        throw new Error(`Invalid arguments: ${acc.safecoin} not provided.`);
      }
    }
  });
}

// Translates an address to a Pubkey.
export function translateAddress(address: Address): PublicKey {
  return address instanceof PublicKey ? address : new PublicKey(address);
}

/**
 * An address to identify an account on chain. Can be a [[PublicKey]],
 * or Base 58 encoded string.
 */
export type Address = PublicKey | string;
