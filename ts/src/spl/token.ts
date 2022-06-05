import { PublicKey } from "@solana/web3.js";
import { Program } from "../program/index.js";
import Provider from "../provider.js";
import { SplTokenCoder } from "../coder/spl-token/index.js";

const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export function program(provider?: Provider): Program<SplToken> {
  return new Program<SplToken>(IDL, TOKEN_PROGRAM_ID, provider, coder());
}

export function coder(): SplTokenCoder {
  return new SplTokenCoder(IDL);
}

/**
 * SplToken IDL.
 */
export type SplToken = {
  version: "0.1.0";
  safecoin: "spl_token";
  instructions: [
    {
      safecoin: "initializeMint";
      accounts: [
        {
          safecoin: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          safecoin: "decimals";
          type: "u8";
        },
        {
          safecoin: "mintAuthority";
          type: "publicKey";
        },
        {
          safecoin: "freezeAuthority";
          type: {
            coption: "publicKey";
          };
        }
      ];
    },
    {
      safecoin: "initializeAccount";
      accounts: [
        {
          safecoin: "account";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          safecoin: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      safecoin: "initializeMultisig";
      accounts: [
        {
          safecoin: "account";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          safecoin: "m";
          type: "u8";
        }
      ];
    },
    {
      safecoin: "transfer";
      accounts: [
        {
          safecoin: "source";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          safecoin: "amount";
          type: "u64";
        }
      ];
    },
    {
      safecoin: "approve";
      accounts: [
        {
          safecoin: "source";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "delegate";
          isMut: false;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          safecoin: "amount";
          type: "u64";
        }
      ];
    },
    {
      safecoin: "revoke";
      accounts: [
        {
          safecoin: "source";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      safecoin: "setAuthority";
      accounts: [
        {
          safecoin: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          safecoin: "authorityType";
          type: "u8";
        },
        {
          safecoin: "newAuthority";
          type: {
            coption: "publicKey";
          };
        }
      ];
    },
    {
      safecoin: "mintTo";
      accounts: [
        {
          safecoin: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "to";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          safecoin: "amount";
          type: "u64";
        }
      ];
    },
    {
      safecoin: "burn";
      accounts: [
        {
          safecoin: "source";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          safecoin: "amount";
          type: "u64";
        }
      ];
    },
    {
      safecoin: "closeAccount";
      accounts: [
        {
          safecoin: "account";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      safecoin: "freezeAccount";
      accounts: [
        {
          safecoin: "account";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      safecoin: "thawAccount";
      accounts: [
        {
          safecoin: "account";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      safecoin: "transferChecked";
      accounts: [
        {
          safecoin: "source";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          safecoin: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          safecoin: "amount";
          type: "u64";
        },
        {
          safecoin: "decimals";
          type: "u8";
        }
      ];
    },
    {
      safecoin: "approveChecked";
      accounts: [
        {
          safecoin: "source";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          safecoin: "delegate";
          isMut: false;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          safecoin: "amount";
          type: "u64";
        },
        {
          safecoin: "decimals";
          type: "u8";
        }
      ];
    },
    {
      safecoin: "mintToChecked";
      accounts: [
        {
          safecoin: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "to";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          safecoin: "amount";
          type: "u64";
        },
        {
          safecoin: "decimals";
          type: "u8";
        }
      ];
    },
    {
      safecoin: "burnChecked";
      accounts: [
        {
          safecoin: "source";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "authority";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          safecoin: "amount";
          type: "u64";
        },
        {
          safecoin: "decimals";
          type: "u8";
        }
      ];
    },
    {
      safecoin: "initializeAccount2";
      accounts: [
        {
          safecoin: "account";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          safecoin: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          safecoin: "authority";
          type: "publicKey";
        }
      ];
    },
    {
      safecoin: "syncNative";
      accounts: [
        {
          safecoin: "account";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      safecoin: "initializeAccount3";
      accounts: [
        {
          safecoin: "account";
          isMut: true;
          isSigner: false;
        },
        {
          safecoin: "mint";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          safecoin: "authority";
          type: "publicKey";
        }
      ];
    },
    {
      safecoin: "initializeMultisig2";
      accounts: [
        {
          safecoin: "account";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          safecoin: "m";
          type: "u8";
        }
      ];
    },
    {
      safecoin: "initializeMint2";
      accounts: [
        {
          safecoin: "mint";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          safecoin: "decimals";
          type: "u8";
        },
        {
          safecoin: "mintAuthority";
          type: "publicKey";
        },
        {
          safecoin: "freezeAuthority";
          type: {
            coption: "publicKey";
          };
        }
      ];
    }
  ];
  accounts: [
    {
      safecoin: "mint";
      type: {
        kind: "struct";
        fields: [
          {
            safecoin: "mintAuthority";
            type: {
              coption: "publicKey";
            };
          },
          {
            safecoin: "supply";
            type: "u64";
          },
          {
            safecoin: "decimals";
            type: "u8";
          },
          {
            safecoin: "isInitialized";
            type: "bool";
          },
          {
            safecoin: "freezeAuthority";
            type: {
              coption: "publicKey";
            };
          }
        ];
      };
    },
    {
      safecoin: "token";
      type: {
        kind: "struct";
        fields: [
          {
            safecoin: "mint";
            type: "publicKey";
          },
          {
            safecoin: "authority";
            type: "publicKey";
          },
          {
            safecoin: "amount";
            type: "u64";
          },
          {
            safecoin: "delegate";
            type: {
              coption: "publicKey";
            };
          },
          {
            safecoin: "state";
            type: "u8";
          },
          {
            safecoin: "isNative";
            type: {
              coption: "u64";
            };
          },
          {
            safecoin: "delegatedAmount";
            type: "u64";
          },
          {
            safecoin: "closeAuthority";
            type: {
              coption: "publicKey";
            };
          }
        ];
      };
    }
  ];
};

export const IDL: SplToken = {
  version: "0.1.0",
  safecoin: "spl_token",
  instructions: [
    {
      safecoin: "initializeMint",
      accounts: [
        {
          safecoin: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          safecoin: "decimals",
          type: "u8",
        },
        {
          safecoin: "mintAuthority",
          type: "publicKey",
        },
        {
          safecoin: "freezeAuthority",
          type: {
            coption: "publicKey",
          },
        },
      ],
    },
    {
      safecoin: "initializeAccount",
      accounts: [
        {
          safecoin: "account",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          safecoin: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      safecoin: "initializeMultisig",
      accounts: [
        {
          safecoin: "account",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          safecoin: "m",
          type: "u8",
        },
      ],
    },
    {
      safecoin: "transfer",
      accounts: [
        {
          safecoin: "source",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          safecoin: "amount",
          type: "u64",
        },
      ],
    },
    {
      safecoin: "approve",
      accounts: [
        {
          safecoin: "source",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "delegate",
          isMut: false,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          safecoin: "amount",
          type: "u64",
        },
      ],
    },
    {
      safecoin: "revoke",
      accounts: [
        {
          safecoin: "source",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      safecoin: "setAuthority",
      accounts: [
        {
          safecoin: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          safecoin: "authorityType",
          type: "u8",
        },
        {
          safecoin: "newAuthority",
          type: {
            coption: "publicKey",
          },
        },
      ],
    },
    {
      safecoin: "mintTo",
      accounts: [
        {
          safecoin: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "to",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          safecoin: "amount",
          type: "u64",
        },
      ],
    },
    {
      safecoin: "burn",
      accounts: [
        {
          safecoin: "source",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          safecoin: "amount",
          type: "u64",
        },
      ],
    },
    {
      safecoin: "closeAccount",
      accounts: [
        {
          safecoin: "account",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      safecoin: "freezeAccount",
      accounts: [
        {
          safecoin: "account",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      safecoin: "thawAccount",
      accounts: [
        {
          safecoin: "account",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      safecoin: "transferChecked",
      accounts: [
        {
          safecoin: "source",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          safecoin: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          safecoin: "amount",
          type: "u64",
        },
        {
          safecoin: "decimals",
          type: "u8",
        },
      ],
    },
    {
      safecoin: "approveChecked",
      accounts: [
        {
          safecoin: "source",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          safecoin: "delegate",
          isMut: false,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          safecoin: "amount",
          type: "u64",
        },
        {
          safecoin: "decimals",
          type: "u8",
        },
      ],
    },
    {
      safecoin: "mintToChecked",
      accounts: [
        {
          safecoin: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "to",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          safecoin: "amount",
          type: "u64",
        },
        {
          safecoin: "decimals",
          type: "u8",
        },
      ],
    },
    {
      safecoin: "burnChecked",
      accounts: [
        {
          safecoin: "source",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "authority",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          safecoin: "amount",
          type: "u64",
        },
        {
          safecoin: "decimals",
          type: "u8",
        },
      ],
    },
    {
      safecoin: "initializeAccount2",
      accounts: [
        {
          safecoin: "account",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          safecoin: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          safecoin: "authority",
          type: "publicKey",
        },
      ],
    },
    {
      safecoin: "syncNative",
      accounts: [
        {
          safecoin: "account",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      safecoin: "initializeAccount3",
      accounts: [
        {
          safecoin: "account",
          isMut: true,
          isSigner: false,
        },
        {
          safecoin: "mint",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          safecoin: "authority",
          type: "publicKey",
        },
      ],
    },
    {
      safecoin: "initializeMultisig2",
      accounts: [
        {
          safecoin: "account",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          safecoin: "m",
          type: "u8",
        },
      ],
    },
    {
      safecoin: "initializeMint2",
      accounts: [
        {
          safecoin: "mint",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          safecoin: "decimals",
          type: "u8",
        },
        {
          safecoin: "mintAuthority",
          type: "publicKey",
        },
        {
          safecoin: "freezeAuthority",
          type: {
            coption: "publicKey",
          },
        },
      ],
    },
  ],
  accounts: [
    {
      safecoin: "mint",
      type: {
        kind: "struct",
        fields: [
          {
            safecoin: "mintAuthority",
            type: {
              coption: "publicKey",
            },
          },
          {
            safecoin: "supply",
            type: "u64",
          },
          {
            safecoin: "decimals",
            type: "u8",
          },
          {
            safecoin: "isInitialized",
            type: "bool",
          },
          {
            safecoin: "freezeAuthority",
            type: {
              coption: "publicKey",
            },
          },
        ],
      },
    },
    {
      safecoin: "token",
      type: {
        kind: "struct",
        fields: [
          {
            safecoin: "mint",
            type: "publicKey",
          },
          {
            safecoin: "authority",
            type: "publicKey",
          },
          {
            safecoin: "amount",
            type: "u64",
          },
          {
            safecoin: "delegate",
            type: {
              coption: "publicKey",
            },
          },
          {
            safecoin: "state",
            type: "u8",
          },
          {
            safecoin: "isNative",
            type: {
              coption: "u64",
            },
          },
          {
            safecoin: "delegatedAmount",
            type: "u64",
          },
          {
            safecoin: "closeAuthority",
            type: {
              coption: "publicKey",
            },
          },
        ],
      },
    },
  ],
};
