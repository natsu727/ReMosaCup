import { Show, type Component, createSignal } from "solid-js";
const { OpenAIClient, AzureKeyCredential } = await import("@azure/openai");
const endpoint = "hiyashichuka.openai.azure.com";
const azureApiKey = "cc6272d82b39473bb8b9a3e234988e30";
const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
const deploymentId = "hiyashi";
let prompt = ["こんにちわ"];
const result = await client.getCompletions(deploymentId, prompt);
for (const choice of result.choices) {
  console.log(choice.text);
}

// let input: any;
// let out: string = "テキストを入力してください";
// const [Info, setInfo] = createSignal(false);
// const [text, setText] = createSignal();
// const writing = () => {
//   setText(input.value);
//   out_strs();
// };
// const out_strs = () => (out = String(text()));
// const toggle = () => setInfo(!Info());
// const sendText = (texts: string) => {
//   // prompt = text;
//   console.log(texts);
//   toggle();
// };
const App: Component = () => {
  return (
    <>
      <a>aaaaa</a>
      {/* <div>
        <input ref={input} oninput={writing} />
        <button
          onClick={(e) => {
            if (!input.value.trim()) return;
            sendText(input.value);
            input.value = "";
          }}
        >
          Add
        </button>
      </div>
      <h1>{out}</h1>
      <Show when={Info()} fallback={""}>
        <h1>ここに文字列</h1>
      </Show> */}
    </>
  );
};

export default App;
