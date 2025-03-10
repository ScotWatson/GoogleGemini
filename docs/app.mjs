/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as Main from "./main.mjs";

const myURL = new URL(window.location);
const apiKey = myURL.searchParams.get("api_key");

async function test(url, blob) {
  return await fetch(url, {
    method: "POST",
    body: blob,
  });
}
const contents = [
  {
    parts: [
      {
        text: "Explain how AI works",
      },
    ],
  },
];
models_generateContent("gemini-2.0-flash", contents).then(async (response) => {
  console.log(await response.json());
});

async function testFile(file) {
  const response = await media_upload(file);
  const responseJSON = await response.json();
  const file_uri = responseJSON.file.uri;
  const contents = [
    {
      parts: [
        {
          text: "Can you tell me about the instruments in this photo?"
        },
        {
          file_data: {
            mime_type: file.type,
            file_uri,
          },
        },
      ],
    },
  ];
  const answer = await models_generateContent(content);
  console.log(answer);
}

const btnTestFile = document.createElement("button");
btnTestFile.innerHTML = "Test File";
document.body.appendChild(btnTestFile);
btnTestFile.addEventListener("click", (evt) => {
  const input = document.createElement("input");
  input.type = "file";
  document.body.appendChild(input);
  input.click();
  input.addEventListener("change", () => {
    const file = input.files[0];
    testFile(file);
  });
});

async function cachedContents_create(contents, tools, expiration, name, displayName, model, systemInstruction, toolConfig) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/cachedContents/" + name + "?" + queryParams.toString());
  const data = {
    model: "models/" + model,
    contents,
    tools,
    expiration,
    name,
    displayName,
    systemInstruction,
    toolConfig,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function cachedContents_list() {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/cachedContents" + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function cachedContents_get() {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/cachedContents/" + name + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function cachedContents_patch(fields, expiration, name) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  for (const field of fields) {
    queryParams.add("updateMask", field);
  }
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/cachedContents/" + name + "?" + queryParams.toString());
  const data = {
    expiration,
    name,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "PATCH",
    body: blob,
  });
}
async function cachedContents_delete(name) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/cachedContents/" + name + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "DELETE",
  });
}
async function corpera_create(name, displayName) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera" + "?" + queryParams.toString());
  const data = {
    name: "corpera/" + name,
    displayName,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function corpera_query(name, query, metadataFilters, resultsCount) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + name + ":query" + "?" + queryParams.toString());
  const data = {
    query,
    metadataFilters,
    resultsCount,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
    body: blob,
  });
}
async function corpera_get() {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + name + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function corpera_list(pageSize, pageToken) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("pageSize", pageSize);
  queryParams.set("pageToken", pageToken);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera" + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function corpera_patch(fields, expiration, name) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  for (const field of fields) {
    queryParams.add("updateMask", field);
  }
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + name + "?" + queryParams.toString());
  const data = {
    displayName,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "PATCH",
    body: blob,
  });
}
async function corpera_delete(force) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("force", force);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera" + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "DELETE",
  });
}
async function corpera_documents_create(parent) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + parent + "/documents" + "?" + queryParams.toString());
  const data = {
    name: "corpera/" + name,
    displayName,
    customMetadata,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function corpera_documents_query(corpera, document, query, resultsCount, metadataFilters) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/documents/" + document + ":query" + "?" + queryParams.toString());
  const data = {
    query,
    metadataFilters,
    resultsCount,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
    body: blob,
  });
}
async function corpera_documents_get(corpera, document) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/documents/" + document + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function corpera_documents_list(corpera, pageSize, pageToken) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("pageSize", pageSize);
  queryParams.set("pageToken", pageToken);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/documents" + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function corpera_documents_patch(corpera, document, fields, displayName, customMetadata) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  for (const field of fields) {
    queryParams.add("updateMask", field);
  }
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/documents/" + document + "?" + queryParams.toString());
  const data = {
    displayName,
    customMetadata,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "PATCH",
    body: blob,
  });
}
async function corpera_documents_delete(corpera, document, force) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("force", force);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/documents/" + document + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "DELETE",
  });
}
async function corpera_documents_chunks_create(parent, document, name) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + parent + "/documents" + document + "/chunks" + "?" + queryParams.toString());
  const data = {
    name: "corpera/" + parent + "/documents" + document + "/chunks" + name,
    data,
    customMetadata,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function corpera_documents_chunks_get(parent, document, chunk) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + parent + "/documents/" + document + "/chunks/" + chunk + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function corpera_documents_chunks_list(parent, document, pageSize, pageToken) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("pageSize", pageSize);
  queryParams.set("pageToken", pageToken);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + parent + "/documents/" + document + "/chunks" + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function corpera_documents_chunks_patch(corpera, document, chunk, fields, data, customMetadata) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  for (const field of fields) {
    queryParams.add("updateMask", field);
  }
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/documents/" + document + "/chunks" + chunk + "?" + queryParams.toString());
  const struct = {
    data,
    customMetadata,
  };
  const blob = new Blob([ JSON.stringify(struct) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "PATCH",
    body: blob,
  });
}
async function corpera_documents_chunks_delete(parent, document, chunk) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + parent + "/documents/" + document + "/chunks/" + chunk + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "DELETE",
  });
}
async function corpera_documents_chunks_batchCreate(parent, document, requests) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + parent + "/documents" + document + "/chunks:batchCreate" + "?" + queryParams.toString());
  const data = {
    requests,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function corpera_documents_chunks_batchUpdate(parent, document, requests) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + parent + "/documents" + document + "/chunks:batchUpdate" + "?" + queryParams.toString());
  const data = {
    requests,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function corpera_documents_chunks_batchDelete(parent, document, requests) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + parent + "/documents" + document + "/chunks:batchDelete" + "?" + queryParams.toString());
  const data = {
    requests,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function corpera_permissions_create(parent) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + parent + "/permissions" + "?" + queryParams.toString());
  const data = {
    granteeType,
    emailAddress,
    role,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
    body: blob,
  });
}
async function corpera_permissions_list() {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("pageSize", pageSize);
  queryParams.set("pageToken", pageToken);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/permissions/" + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function corpera_permissions_get(corpera, permission) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/permissions/" + permission + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function corpera_permissions_patch(corpera, permission, role) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  for (const field of fields) {
    queryParams.add("updateMask", field);
  }
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/permissions/" + permission + "?" + queryParams.toString());
  const data = {
    role,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "PATCH",
    body: blob,
  });
}
async function corpera_permissions_delete(corpera, permission) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/corpera/" + corpera + "/permissions/" + permission + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "DELETE",
  });
}
async function files_get(name) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/files/" + name + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function files_list(name) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("pageSize", pageSize);
  queryParams.set("pageToken", pageToken);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/files/" + name + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function files_delete(name) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/files/" + name + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "DELETE",
  });
}
async function media_upload(file) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/upload/v1beta/files" + "?" + queryParams.toString());
  const headers = new Headers();
  headers.set("X-Goog-Upload-Protocol", "resumable");
  headers.set("X-Goog-Upload-Command", "start");
  headers.set("X-Goog-Upload-Header-Content-Length", file.length);
  headers.set("X-Goog-Upload-Header-Content-Type", file.type);
  const metadata = {
    file: {
      display_name: file.name,
    },
  };
  const body = new Blob( [ JSON.stringify(metadata) ], {
    type: "application/json",
  });
  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body,
  });
  const upload_url = response.headers.get("x-goog-upload-url");
  const headersFile = new Headers();
  headersFile.set("X-Goog-Upload-Offset", "0");
  headersFile.set("X-Goog-Upload-Command", "upload, finalize");
  return await fetch(upload_url, {
    method: "POST",
    headers: headersFile,
    body: file,
  });
}
async function media_metadata() {
  
}
async function models_batchEmbedContents(model, requests) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/models/" + model +":batchEmbedContents" + "?" + queryParams.toString());
  const data = {
    requests,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
// models_batchEmbedText (deprecated)
// models_countMessageTokens (deprecated)
// models_countTextTokens (deprecated)
async function models_countTokens(model, contents, tools, toolConfig, safetySettings, systemInstruction, generationConfig, cachedContent) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/models/" + model +":countTokens" + "?" + queryParams.toString());
  const data = {
    model: "modles/" + model,
    contents,
    tools,
    toolConfig,
    safetySettings,
    systemInstruction,
    generationConfig,
    cachedContent,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function models_embedContent(model, content, taskType, title, outputDimensionality) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/models/" + model +":embedContents" + "?" + queryParams.toString());
  const data = {
    content,
    taskType,
    title,
    outputDimensionality,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
// models_embedText (deprecated)
async function models_generateAnswer() {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/models/" + model +":generateAnswer" + "?" + queryParams.toString());
  const data = {
    contents,
    answerStyle,
    safetySettings,
    grounding_source,
    temperature,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function models_generateContent(model, contents, tools, toolConfig, safetySettings, systemInstruction, generationConfig, cachedContent) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/models/" + model +":generateContent" + "?" + queryParams.toString());
  const data = {
    contents,
    tools,
    toolConfig,
    safetySettings,
    systemInstruction,
    generationConfig,
    cachedContent,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
    body: blob,
  });
}
// models_generateMessage (deprecated)
// models_generateText (deprecated)
async function models_get(name) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/models/" + name + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function models_list(pageSize, pageToken) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("pageSize", pageSize);
  queryParams.set("pageToken", pageToken);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/models/" + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function models_streamGenerateContent(model, contents, tools, toolConfig, safetySettings, systemInstruction, generationConfig, cachedContent) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/models/" + model +":streamGenerateContent" + "?" + queryParams.toString());
  const data = {
    contents,
    tools,
    toolConfig,
    safetySettings,
    systemInstruction,
    generationConfig,
    cachedContent,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}

async function tunedModels_create(tunedModelId, displayName, description, tuningTask, readerProjectNumbers, source_model, temperature, topP, topK) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("tunedModelId", tunedModelId);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + "?" + queryParams.toString());
  const data = {
    displayName,
    description,
    tuningTask,
    readerProjectNumbers,
    source_model,
    temperature,
    topP,
    topK,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function tunedModels_delete(tunedModelId) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  queryParams.set("tunedModelId", tunedModelId);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "DELETE",
  });
}
async function tunedModels_generateContent(tunedModelId, contents, tools, toolConfig, safetySettings, systemInstruction, generationConfig, cachedContent) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + ":generateContent" + "?" + queryParams.toString());
  const data = {
    contents,
    tools,
    toolConfig,
    safetySettings,
    systemInstruction,
    generationConfig,
    cachedContent,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
// tunedModels_generateText (deprecated)
async function tunedModels_get(tunedModelId) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function tunedModels_list() {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function tunedModels_patch(tunedModelId, displayName, description, tuningTask, readerProjectNumbers, source_model, temperature, topP, topK) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  for (const field of fields) {
    queryParams.add("updateMask", field);
  }
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + "?" + queryParams.toString());
  const data = {
    displayName,
    description,
    tuningTask,
    readerProjectNumbers,
    source_model,
    temperature,
    topP,
    topK,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "PATCH",
    body: blob,
  });
}
async function tunedModels_streamGenerateContent(tunedModelId, contents, tools, toolConfig, safetySettings, systemInstruction, generationConfig, cachedContent) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + ":streamGenerateContent" + "?" + queryParams.toString());
  const data = {
    contents,
    tools,
    toolConfig,
    safetySettings,
    systemInstruction,
    generationConfig,
    cachedContent,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function tunedModels_transferOwnership(tunedModelId, emailAddress) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + ":streamGenerateContent" + "?" + queryParams.toString());
  const data = {
    emailAddress,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
  });
}
async function tunedModels_permissions_create(parent, granteeType, emailAddress, role) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + parent + "/permissions" + "?" + queryParams.toString());
  const data = {
    granteeType,
    emailAddress,
    role,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "POST",
    body: blob,
  });
}
async function tunedModels_permissions_delete(tunedModelId, permission) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + "/permissions/" + permission + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "DELETE",
  });
}
async function tunedModels_permissions_get(tunedModelId, permission) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + "/permissions/" + permission + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function tunedModels_permissions_list(tunedModelId) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + "/permissions/" + "?" + queryParams.toString());
  return await fetch(endpoint, {
    method: "GET",
  });
}
async function tunedModels_permissions_patch(tunedModelId, permission) {
  const queryParams = new URLSearchParams();
  queryParams.set("key", apiKey);
  for (const field of fields) {
    queryParams.add("updateMask", field);
  }
  const endpoint = new URL("https://generativelanguage.googleapis.com/v1beta/tunedModels/" + tunedModelId + "/permissions/" + permission + "?" + queryParams.toString());
  const data = {
    role,
  };
  const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
  return await fetch(endpoint, {
    method: "PATCH",
    body: blob,
  });
}
