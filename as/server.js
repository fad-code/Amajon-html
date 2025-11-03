// server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { text } from "express";
import { z } from "zod";

// 1) Create an MCP server instance
const server = new McpServer({
  name: "Weather & Hello Tools",
  version: "1.0.0",
});

// 2) Example #1 — sayHello (your practice tool)
server.tool(
  "sayHello",
  "Return a friendly greeting with the provided name",
  {
    name: z.string().min(1, "Name is required").describe("Person's name"),
  },
  async ({ name }) => {
    const message = `Hello, ${name}!`;
    return {
      content: [{ type: "text", text: message }],
    };
  }
);

// 3) Mock helper for weather (simulates data)
async function getWeatherByCity(city: string) {
  const c = city.toLowerCase();
  if (c === "new york") return { temp: "22°C", forecast: "Partly cloudy with a breeze" };
  if (c === "london")   return { temp: "16°C", forecast: "Rainy and overcast" };
  return { temp: null, error: "Weather data not available for this city" };
}

// 4) Example #2 — getWeatherDataByCityName (returns JSON **text**)
server.tool(
  "getWeatherDataByCityName",
  "Return mock weather data for a city (New York or London) as JSON text",
  {
    city: z
      .string()
      .min(1, "City is required")
      .describe('City name, e.g. "New York" or "London"'),
  },
  async ({ city }) => {
    const data = await getWeatherByCity(city);

    // The challenge asked for JSON TEXT (string), not a JS object
    const payload = {
      city,
      ...data,
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(payload), // <- JSON string
        },
      ],
    };
  }
);

// 5) Wire up stdio transport so MCP clients can talk to your server
(async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
})();


server.tool(
  "add",
  "Return with a sum of two numbers",
  {
    a :z.number().describe("First Number"),
    b :z.number().describe("Second Number"),
    
  },
  async ({a,b}) => {
    const sum = a + b;
    
    if (Number.isNaN(sum)){
    return {
      content : [
        {type : "text", text: "Error: result is NaN. Check your inputs."}
      ]
    } 
  }
 return {
  content : [ 
    {type :"text", text :String(sum)}
  ]

 }
)

server.tool(
  "add",
  "Return the sum of two numbers",
  {
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  },
  async ({ a, b }) => {
    const sum = a + b;

    if (Number.isNaN(sum)) {
      return {
        content: [
          { type: "text", text: "Error: result is NaN. Check your inputs." }
        ]
      };
    }

    return {
      content: [
        { type: "text", text: String(sum) }
      ]
    };
  }
);

server.tool (
  "multiply",
  "Return the multiplication of two numbers",
  {
    a:z.coerce.number().describe("First Number"),
    b:z.coerce.number().describe("Second Number"),
  },

  async ({a, b})=>{
    const multiply = a * b ;

    if (Number.isNaN(multiply)){
      return {
        content : [ 
          {type : "text", text : "Error: result is NaN. Check your inputs."}
        ]
      };
    }
    return {
      content:[
        {type : "text", text: String(multiply)}
      ]
    }
  }
)