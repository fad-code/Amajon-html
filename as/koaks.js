// server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1) Create MCP server instance
const server = new McpServer({
  name: "Weather Data Fetcher",
  version: "1.0.0",
});

// 2) Existing example tool (kept as-is)
server.tool(
  "trackPackage",
  "Track delivery status using tracking number",
  {
    trackingNumber: z.string().describe("Package tracking number"),
  },
  async ({ trackingNumber }) => {
    return {
      content: [
        { type: "text", text: `Checking delivery status for: ${trackingNumber}` },
      ],
    };
  }
);

// 3) Mock helper (your provided function)
async function getWeatherByCity(city: string) {
  const name = city.toLowerCase();
  if (name === "new york") {
    return { temp: "22°C", forecast: "Partly cloudy with a breeze" };
  }
  if (name === "london") {
    return { temp: "16°C", forecast: "Rainy and overcast" };
  }
  return { temp: null, error: "Weather data not available for this city" };
}

// 4) ✅ Challenge tool: getWeatherDataByCityName
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

    // Build a JSON payload; the challenge asks for "JSON text"
    const payload = {
      city,
      ...data,
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(payload), // JSON string result
        },
      ],
    };
  }
);

// 5) Connect to a transport so clients can call your tools
(async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // From here on, the MCP client communicates with this server over stdio.
})();
