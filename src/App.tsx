import {
  For,
  Show,
  type Component,
  createSignal,
  onMount,
  createMemo,
  createEffect,
} from "solid-js";
import { OpenAIClient, AzureKeyCredential, Choice } from "@azure/openai";
const str =
  "次に記述する文章をリフレーミングし、相手を褒める言葉に変換し言葉のみを返せ";
const App: Component = () => {
  // OpenAIの設定
  const endpoint = "https://hiyashichuka.openai.azure.com";
  const azureApiKey = "cc6272d82b39473bb8b9a3e234988e30";
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(azureApiKey)
  );
  const deploymentId = "hiyashi";
  const [Prom, setProm] = createSignal<string[]>([
    "このWebサイトにアクセスした人に対して挨拶をしなさい",
  ]);
  // const prompt = ["こんにちは"];
  const [Results, setResults] = createSignal<Choice[]>();

  let input: any;
  createEffect(async () => {
    const prompt = Prom();
    console.log("prompt>>" + prompt);
    const result = await client.getCompletions(deploymentId, prompt);
    setResults(result.choices);
  });
  // const sendText = async () => {
  //   const prompt = Prom();
  //   console.log("prompt>>" + prompt);
  //   const result = await client.getCompletions(deploymentId, prompt);
  //   setResults(result.choices);
  // };
  const [Out, setOut] = createSignal<string>();
  const out = createMemo(() => {
    return Out();
  });
  return (
    <>
      <h1>Peaceful Talking</h1>
      <div>
        <input ref={input} oninput={setOut(this)} />
        <button
          onClick={(e) => {
            if (!input.value.trim()) return;
            const out = [str, input.value];
            console.log("out>>" + out);
            setProm(out);
            // sendText();
            setOut(input.value);
            input.value = "";
          }}
        >
          Add
        </button>
      </div>
      <Show when={Out()} fallback={"入力してください"}>
        <h1>{out()}</h1>
        <h2>⇓⇓⇓</h2>
      </Show>
      <div>
        <For each={Results()} fallback={<p>Loading...</p>}>
          {(result) => <h1>{result.text}</h1>}
        </For>
      </div>
    </>
  );
};

export default App;
