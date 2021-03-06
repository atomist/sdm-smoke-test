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

import { After } from "cucumber";
import { SmokeTestWorld } from "./world";
import { waitSeconds } from "../../../src/framework/assertion/util/wait";

/**
 * Cleanup repositories created
 */
After(async function(testCase) {
    const world: SmokeTestWorld = this as SmokeTestWorld;
    await waitSeconds(parseInt(process.env.CLEANUP_DELAY, 10) || 0);
    return world.cleanup();
});
