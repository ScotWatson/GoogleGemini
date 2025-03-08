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
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
const data = {
  "contents": [{
    "parts":[{
      "text": "Explain how AI works",
    }],
  }],
};
const blob = new Blob([ JSON.stringify(data) ], { type: "application/json" });
test(url, blob).then(async (response) => {
  console.log(await response.json());
});
