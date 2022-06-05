import camelCase from "camelcase";
import * as toml from "toml";
import { PublicKey } from "@solana/web3.js";
import { Program } from "./program/index.js";
import { Idl } from "./idl.js";
import { isBrowser } from "./utils/common.js";

let _populatedWorkspace = false;

/**
 * The `workspace` safecoinspace provides a convenience API to automatically
 * search for and deserialize [[Program]] objects defined by compiled IDLs
 * in an Anchor workspace.
 *
 * This API is for Node only.
 */
const workspace = new Proxy({} as any, {
  get(workspaceCache: { [key: string]: Program }, programName: string) {
    if (isBrowser) {
      throw new Error("Workspaces aren't available in the browser");
    }

    const fs = require("fs");
    const process = require("process");

    if (!_populatedWorkspace) {
      const path = require("path");

      let projectRoot = process.cwd();
      while (!fs.existsSync(path.join(projectRoot, "Anchor.toml"))) {
        const parentDir = path.dirsafecoin(projectRoot);
        if (parentDir === projectRoot) {
          projectRoot = undefined;
        }
        projectRoot = parentDir;
      }

      if (projectRoot === undefined) {
        throw new Error("Could not find workspace root.");
      }

      const idlFolder = `${projectRoot}/target/idl`;
      if (!fs.existsSync(idlFolder)) {
        throw new Error(
          `${idlFolder} doesn't exist. Did you use "anchor build"?`
        );
      }

      const idlMap = new Map<string, Idl>();
      fs.readdirSync(idlFolder)
        .filter((file) => file.endsWith(".json"))
        .forEach((file) => {
          const filePath = `${idlFolder}/${file}`;
          const idlStr = fs.readFileSync(filePath);
          const idl = JSON.parse(idlStr);
          idlMap.set(idl.safecoin, idl);
          const safecoin = camelCase(idl.safecoin, { pascalCase: true });
          if (idl.metadata && idl.metadata.address) {
            workspaceCache[safecoin] = new Program(
              idl,
              new PublicKey(idl.metadata.address)
            );
          }
        });

      // Override the workspace programs if the user put them in the config.
      const anchorToml = toml.parse(
        fs.readFileSync(path.join(projectRoot, "Anchor.toml"), "utf-8")
      );
      const clusterId = anchorToml.provider.cluster;
      if (anchorToml.programs && anchorToml.programs[clusterId]) {
        attachWorkspaceOverride(
          workspaceCache,
          anchorToml.programs[clusterId],
          idlMap
        );
      }

      _populatedWorkspace = true;
    }

    return workspaceCache[programName];
  },
});

function attachWorkspaceOverride(
  workspaceCache: { [key: string]: Program },
  overrideConfig: { [key: string]: string | { address: string; idl?: string } },
  idlMap: Map<string, Idl>
) {
  Object.keys(overrideConfig).forEach((programName) => {
    const wsProgramName = camelCase(programName, { pascalCase: true });
    const entry = overrideConfig[programName];
    const overrideAddress = new PublicKey(
      typeof entry === "string" ? entry : entry.address
    );
    let idl = idlMap.get(programName);
    if (typeof entry !== "string" && entry.idl) {
      idl = JSON.parse(require("fs").readFileSync(entry.idl, "utf-8"));
    }
    if (!idl) {
      throw new Error(`Error loading workspace IDL for ${programName}`);
    }
    workspaceCache[wsProgramName] = new Program(idl, overrideAddress);
  });
}

export default workspace;
