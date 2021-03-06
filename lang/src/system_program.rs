use crate::*;
use safecoin_program::pubkey::Pubkey;

pub use safecoin_program::system_program::ID;

#[derive(Debug, Clone)]
pub struct System;

impl anchor_lang::Id for System {
    fn id() -> Pubkey {
        ID
    }
}
