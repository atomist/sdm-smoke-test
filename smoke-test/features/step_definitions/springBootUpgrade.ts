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

import { Given, Then, When } from "cucumber";

// Note: We cannot use arrow functions as binding doesn't work

/**
 * Definitions to handle Spring Boot version upgrade
 */

// Save the current sha as name
When(/try to upgrade Spring Boot to (.*)/, function(version) {
    throw new Error("Implement Spring Boot upgrade using command");
});
