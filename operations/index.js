import {tool} from '@langchain/core/tools';
import {z} from 'zod';
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolMessage } from '@langchain/core/messages';
import {config} from 'dotenv';
import {ChatOpenAI} from '@langchain/openai';

config(); 




const llm = new ChatOpenAI({
  modelName: "gpt-4o",
  apiKey: process.env.OPENAI_API_KEY,
});

const multiply = tool(
  async ({ a, b }) => {
    return a * b;
  },
  {
    name: "multiply",
    description: "multiplies two numbers",
    schema: z.object({
      a: z.number("the first number"),
      b: z.number("the second number"),
    }),
  }
);

const add = tool(
  async ({ a, b }) => {
    return a * b;
  },
  {
    name: "add",
    description: "Add two numbers",
    schema: z.object({
      a: z.number("the first number"),
      b: z.number("the second number"),
    }),
  }
);

const divide = tool(
  async ({ a, b }) => {
    return a * b;
  },
  {
    name: "divide",
    description: "Divide two numbers",
    schema: z.object({
      a: z.number("the first number"),
      b: z.number("the second number"),
    }),
  }
);

const tools = [add, multiply, divide];
const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const llmWithTools = llm.bindTools(tools);

async function llmCall(state) {
  // LLM decides whether to call a tool or not
  const result = await llmWithTools.invoke([
    {
      role: "system",
      content: "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
    },
    ...state.messages
  ]);

  return {
    messages: [result]
  };
}

async function toolNode(state){
    const result = [];
    const lastMessage = state.messages.at(-1);
    if (lastMessage?.tool_calls?.length) {
        for (const toolCall of lastMessage.tool_calls) {
            const tool = toolsByName[toolCall.name];
            const observation = await tool.invoke(toolCall.args);
            result.push(
                new ToolMessage({
                    content: observation.toString(),
                    tool_call_id: toolCall.id,
                })
            );
        }
    }
    // Return the updated state with new tool messages appended
    return {
        messages: result
    };
}

function shouldContinue(state) {
  const messages = state.messages;
  const lastMessage = messages.at(-1);

  // If the LLM makes a tool call, then perform an action
  if (lastMessage?.tool_calls?.length) {
    return "Action";
  }
  // Otherwise, we stop (reply to the user)
  return "__end__";
}

const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  .addEdge("__start__", "llmCall")
  .addConditionalEdges(
    "llmCall",
    shouldContinue,
    {
      // Name returned by shouldContinue : Name of next node to visit
      "Action": "tools",
      "__end__": "__end__",
    }
  )
  .addEdge("tools", "llmCall")
  .compile();


  const messages = [{
  role: "user",
  content: "Add 3 and 4 and multiply the result by 2, then divide by 3."
}];
const result = await agentBuilder.invoke({ messages });
console.log(result.messages);