/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { setWorldConstructor } from "cucumber";
import { GitHubRemoteHelper } from "../../../src/framework/assertion/github/GitHubRemoteHelper";
import { SmokeTestConfig } from "../../../src/framework/config";
import { EnvironmentSmokeTestConfig } from "../../../src/framework/EnvironmentSmokeTestConfig";

import { logger } from "@atomist/automation-client";
import { ApolloGraphClient } from "@atomist/automation-client/graph/ApolloGraphClient";
import { GitHubRepoRef } from "@atomist/automation-client/operations/common/GitHubRepoRef";
import { TokenCredentials } from "@atomist/automation-client/operations/common/ProjectOperationCredentials";
import {
    RemoteRepoRef,
    RepoId,
} from "@atomist/automation-client/operations/common/RepoId";
import { GraphClient } from "@atomist/automation-client/spi/graph/GraphClient";
import * as assert from "power-assert";

/**
 * World with basic setup and enabling focus repo to be set,
 * saved and loaded.
 */
export class SmokeTestWorld {

    private mFocusRepo: RemoteRepoRef;

    get focusRepo(): RemoteRepoRef {
        return this.mFocusRepo;
    }
    set focusRepo(fr: RemoteRepoRef) {
        this.mFocusRepo = fr;
    }

    public readonly config: SmokeTestConfig = EnvironmentSmokeTestConfig;

    public readonly gitRemoteHelper = new GitHubRemoteHelper(this.config.credentials);

    private readonly reposCreated: RepoId[] = [];

    public get graphClient(): GraphClient {
        return new ApolloGraphClient(`${this.config.graphClientEndpoint}/${this.config.atomistTeamId}`,
            { Authorization: `token ${(this.config.credentials as TokenCredentials).token}` });
    }

    /**
     * Set the focus repo
     * @param {Repo} repo
     */
    public setGitHubFocus(repo: GitHubRepoRef): RemoteRepoRef {
        this.focusRepo = repo;
        logger.info("Set focus project to %j", repo);
        return this.focusRepo;
    }

    /**
     * Save the current SHA
     * @param {string} name
     */
    public save(name: string) {
        assert(!!this.focusRepo, `Focus repo must be set to save as [${name}]`);
        this[key(name)] = this.focusRepo;
        logger.info("Saved focus repo %j as %s", this.focusRepo, name);
    }

    public load(name: string): RemoteRepoRef {
        const focus = this[key(name)];
        assert(!!focus, `No repo saved as [${name}]`);
        return this.setGitHubFocus(focus);
    }

    public registerCreated(rr: RemoteRepoRef) {
        this.reposCreated.push(rr);
        this.focusRepo = rr;
    }

    // TODO also clean up created branches
    public async cleanup() {
        this.focusRepo = undefined;

        logger.info("%d repos to clean up", this.reposCreated.length);
        return Promise.all(
            this.reposCreated.map(async id => {
                await this.gitRemoteHelper.deleteRepo(id);
                logger.info("Deleting repo %j", id);
            }),
        );
    }
}

function key(name: string): string {
    return "focus_" + name;
}

setWorldConstructor(SmokeTestWorld);
