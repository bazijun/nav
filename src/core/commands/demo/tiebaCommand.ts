import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = YuTerminal.ComponentOutputType;

const baseUrl = "https://www.baidu.com/s";

/**
 * B 站搜索命令
 * @author yupi
 */
const tieBaCommand: CommandType = {
  func: "tieba",
  name: "贴吧 搜索",
  alias: ["tb", "tieb"],
  params: [
    {
      key: "word",
      desc: "贴吧名字",
      required: true,
    },
  ],
  options: [
    {
      key: "self",
      desc: "是否当前页面中打开",
      alias: ["s"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  collapsible: true,
  action(options, terminal) {
    const { _, self } = options;
    const word = _.length > 0 ? _[0] : "";
    const targetLink = `https://tieba.baidu.com/f?ie=utf-8&kw=${word}`;
    if (self) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./tiebaBox.vue")),
        props: {
          word,
        },
      };
      terminal.writeResult(output);
      return;
    } else {
      window.open(targetLink);
    }
  },
};

export default tieBaCommand;
