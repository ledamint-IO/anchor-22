use crate::Error;
use quote::quote;

pub fn generate(error: Error) -> proc_macro2::TokenStream {
    let error_enum = &error.raw_enum;
    let enum_safecoin = &error.ident;
    // Each arm of the `match` statement for implementing `std::fmt::Display`
    // on the user defined error code.
    let display_variant_dispatch: Vec<proc_macro2::TokenStream> = error
        .raw_enum
        .variants
        .iter()
        .enumerate()
        .map(|(idx, variant)| {
            let ident = &variant.ident;
            let error_code = &error.codes[idx];
            let display_msg = match &error_code.msg {
                None => {
                    quote! {
                        <Self as std::fmt::Debug>::fmt(self, fmt)
                    }
                }
                Some(msg) => {
                    quote! {
                        write!(fmt, #msg)
                    }
                }
            };
            quote! {
                #enum_safecoin::#ident => #display_msg
            }
        })
        .collect();

    // Each arm of the `match` statement for implementing the `safecoin` function
    // on the user defined error code.
    let safecoin_variant_dispatch: Vec<proc_macro2::TokenStream> = error
        .raw_enum
        .variants
        .iter()
        .map(|variant| {
            let ident = &variant.ident;
            let ident_safecoin = ident.to_string();
            quote! {
                #enum_safecoin::#ident => #ident_safecoin.to_string()
            }
        })
        .collect();

    let offset = match error.args {
        None => quote! { anchor_lang::error::ERROR_CODE_OFFSET},
        Some(args) => {
            let offset = &args.offset;
            quote! { #offset }
        }
    };

    quote! {
        #[derive(std::fmt::Debug, Clone, Copy)]
        #[repr(u32)]
        #error_enum

        impl #enum_safecoin {
            pub fn safecoin(&self) -> String {
                match self {
                    #(#safecoin_variant_dispatch),*
                }
            }
        }

        impl From<#enum_safecoin> for u32 {
            fn from(e: #enum_safecoin) -> u32 {
                e as u32 + #offset
            }
        }

        impl From<#enum_safecoin> for anchor_lang::error::Error {
            fn from(error_code: #enum_safecoin) -> Error {
                anchor_lang::error::Error::from(
                    anchor_lang::error::AnchorError {
                        error_safecoin: error_code.safecoin(),
                        error_code_number: error_code.into(),
                        error_msg: error_code.to_string(),
                        source: None,
                        account_safecoin: None
                    }
                )
            }
        }

        impl std::fmt::Display for #enum_safecoin {
            fn fmt(&self, fmt: &mut std::fmt::Formatter<'_>) -> std::result::Result<(), std::fmt::Error> {
                match self {
                    #(#display_variant_dispatch),*
                }
            }
        }
    }
}
