import styles from "./App.module.css";
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
  "次に記述する文章をリフレーミングし、相手を褒める言葉に変換し言葉のみを日本語で返せ";
const App: Component = () => {
  // OpenAIの設定
  const endpoint = "https://hiyashichuka.openai.azure.com";
  const azureApiKey = "";
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
      <div class={styles.center}>
        <h1 class={styles.title}>
          <h1>Peaceful</h1>
          <h1>Talking</h1>
        </h1>
        <div class={styles.box}>
          <input ref={input} class={styles.textbox} oninput={setOut(this)} />
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
            class={styles.text}
          >
            Go
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
      </div>
    </>
  );
};

export default App;
