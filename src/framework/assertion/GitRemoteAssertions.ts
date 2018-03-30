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

import { RemoteRepoRef } from "@atomist/automation-client/operations/common/RepoId";
import { RepoBranchTips } from "../../typings/types";

import Commit = RepoBranchTips.Commit;
import { GitProject } from "@atomist/automation-client/project/git/GitProject";
import { AssertOptions } from "./AssertOptions";

export interface Dated {
    date: Date;
}

export interface GitRemoteAssertions {

    assertRepoExists(params: { owner: string, name: string, opts?: AssertOptions }): Promise<any>;

    lastCommit(id: RemoteRepoRef,
               opts?: AssertOptions): Promise<(Commit & Dated) | undefined>;

    clone(id: RemoteRepoRef,
          opts?: AssertOptions): Promise<GitProject>;
}
