<template>
  <div ref="domRef" style="height: 100vh" />
</template>
<!-- 已过时，XTerm 不好用 -->
<script setup lang="ts">
import { Terminal } from "xterm";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import { doCommandExecute } from "../../core/commandExecutor";
import "xterm/css/xterm.css";

const domRef = ref();
let term: any;
const userName = ref("local");
let currentLine = "";

onMounted(() => {
  initXTerm();
});

/**
 * 初始化终端
 */
const initXTerm = () => {
  term = new Terminal({
    disableStdin: false, // 禁用输入
    cursorBlink: true, //光标闪烁
    tabStopWidth: 4, // tab 对应的空格数
    fontSize: 18,
  });
  const fitAddon: FitAddon = new FitAddon(); // 全屏插件
  term.loadAddon(fitAddon);
  term.loadAddon(new WebLinksAddon());
  term.open(domRef.value);
  fitAddon.fit();
  term.focus();

  const promptWords = `\r\n[${userName.value}]$ `;

  term.prompt = () => {
    term.write(promptWords);
  };

  term.writeln(
    `😆小把子导航` +
      `<a href="//github.com/liyupi/yuindex" target='_blank'> thanks</a>`
  );
  term.prompt();

  term.onData((key: string) => {
    if (key.match(/[\u4E00-\u9FA5]/)) {
      currentLine += key;
      term.write(new TextEncoder().encode(key));
    }
  });

  term.onKey((e: any) => {
    const ev = e.domEvent;
    const printable =
      !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
    // 回车
    if (ev.keyCode === 13) {
      // 执行命令
      term.writeln("");
      doCommandExecute(currentLine, term);
      currentLine = "";
      term.prompt();
    } else if (ev.keyCode === 8) {
      // 防止删除提示符
      if (term._core.buffer.x > promptWords.length - 2) {
        currentLine = currentLine.slice(0, -1);
        term.write("\b \b");
      }
    } else if (printable) {
      currentLine += e.key;
      term.write(e.key);
    }
  });

  // // 处理粘贴事件，可以不用获取权限
  // term.textarea.addEventListener("paste", (e: ClipboardEvent) => {
  //   const pasteWords = e.clipboardData?.getData("text");
  //   currentLine += pasteWords;
  //   term.write(pasteWords);
  // });

  window.onresize = () => fitAddon.fit();

  // 自定义快捷键
  term.attachCustomKeyEventHandler((e: any) => {
    // 清屏
    if (e.ctrlKey && e.code === "KeyL" && e.type === "keydown") {
      term.clear();
      return true;
    }
    return true;
  });
};

onBeforeUnmount(() => {
  term?.dispose();
});
</script>

<style>
.terminal {
  height: calc(100% - 50px);
  padding: 25px;
  overflow: hidden;
}
</style>
