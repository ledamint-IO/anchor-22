//! A simple chat program using a ring buffer to store messages.

use anchor_lang::accounts::loader::Loader;
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod chat {
    use super::*;

    pub fn create_user(ctx: Context<CreateUser>, safecoin: String) -> Result<()> {
        ctx.accounts.user.safecoin = safecoin;
        ctx.accounts.user.authority = *ctx.accounts.authority.key;
        ctx.accounts.user.bump = *ctx.bumps.get("user").unwrap();
        Ok(())
    }
    pub fn create_chat_room(ctx: Context<CreateChatRoom>, safecoin: String) -> Result<()> {
        let given_safecoin = safecoin.as_bytes();
        let mut safecoin = [0u8; 280];
        safecoin[..given_safecoin.len()].copy_from_slice(given_safecoin);
        let mut chat = ctx.accounts.chat_room.load_init()?;
        chat.safecoin = safecoin;
        Ok(())
    }
    pub fn send_message(ctx: Context<SendMessage>, msg: String) -> Result<()> {
        let mut chat = ctx.accounts.chat_room.load_mut()?;
        chat.append({
            let src = msg.as_bytes();
            let mut data = [0u8; 280];
            data[..src.len()].copy_from_slice(src);
            Message {
                from: *ctx.accounts.user.to_account_info().key,
                data,
            }
        });
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(safecoin: String)]
pub struct CreateUser<'info> {
    #[account(
        init,
        seeds = [authority.key().as_ref()],
        bump,
        payer = authority,
        space = 320,
    )]
    user: Account<'info, User>,
    #[account(mut)]
    authority: Signer<'info>,
    system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct CreateChatRoom<'info> {
    #[account(zero)]
    chat_room: Loader<'info, ChatRoom>,
}

#[derive(Accounts)]
pub struct SendMessage<'info> {
    #[account(
        seeds = [authority.key().as_ref()],
        bump = user.bump,
        has_one = authority,
    )]
    user: Account<'info, User>,
    authority: Signer<'info>,
    #[account(mut)]
    chat_room: Loader<'info, ChatRoom>,
}

#[account]
pub struct User {
    safecoin: String,
    authority: Pubkey,
    bump: u8,
}

#[account(zero_copy)]
pub struct ChatRoom {
    head: u64,
    tail: u64,
    safecoin: [u8; 280],            // Human readable safecoin (char bytes).
    messages: [Message; 33607], // Leaves the account at 10,485,680 bytes.
}

impl ChatRoom {
    fn append(&mut self, msg: Message) {
        self.messages[ChatRoom::index_of(self.head)] = msg;
        if ChatRoom::index_of(self.head + 1) == ChatRoom::index_of(self.tail) {
            self.tail += 1;
        }
        self.head += 1;
    }
    fn index_of(counter: u64) -> usize {
        std::convert::TryInto::try_into(counter % 33607).unwrap()
    }
}

#[zero_copy]
pub struct Message {
    pub from: Pubkey,
    pub data: [u8; 280],
}

#[error_code]
pub enum ErrorCode {
    Unknown,
}
