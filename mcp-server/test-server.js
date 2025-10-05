#!/usr/bin/env node

/**
 * Simple test script for the MCP server
 * Tests all tools and resources
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

async function testMCPServer() {
  console.log('🚀 Starting MCP Server Test...\n');

  // Start the server process
  const serverProcess = spawn('node', ['dist/index.js'], {
    stdio: ['pipe', 'pipe', 'inherit'],
    cwd: process.cwd(),
  });

  // Create client and connect
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['dist/index.js'],
  });

  const client = new Client(
    {
      name: 'test-client',
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  try {
    await client.connect(transport);
    console.log('✅ Connected to MCP server\n');

    // Test 1: List available tools
    console.log('📋 Test 1: Listing available tools...');
    const tools = await client.listTools();
    console.log(`Found ${tools.tools.length} tools:`);
    tools.tools.forEach((tool) => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });
    console.log();

    // Test 2: List available resources
    console.log('📋 Test 2: Listing available resources...');
    const resources = await client.listResources();
    console.log(`Found ${resources.resources.length} resources:`);
    resources.resources.forEach((resource) => {
      console.log(`  - ${resource.name} (${resource.uri})`);
    });
    console.log();

    // Test 3: Detect mood
    console.log('📋 Test 3: Testing detect_mood tool...');
    const moodResult = await client.callTool({
      name: 'detect_mood',
      arguments: {
        text: 'I am feeling really happy and excited about my new project!',
      },
    });
    console.log('Result:', JSON.parse(moodResult.content[0].text));
    console.log();

    // Test 4: Get music recommendation
    console.log('📋 Test 4: Testing get_music_recommendation...');
    const musicResult = await client.callTool({
      name: 'get_music_recommendation',
      arguments: {
        mood: 'happy',
        count: 2,
      },
    });
    console.log('Result:', JSON.parse(musicResult.content[0].text));
    console.log();

    // Test 5: Get book recommendation
    console.log('📋 Test 5: Testing get_book_recommendation...');
    const bookResult = await client.callTool({
      name: 'get_book_recommendation',
      arguments: {
        mood: 'anxious',
        count: 1,
      },
    });
    console.log('Result:', JSON.parse(bookResult.content[0].text));
    console.log();

    // Test 6: Get place recommendation
    console.log('📋 Test 6: Testing get_place_recommendation...');
    const placeResult = await client.callTool({
      name: 'get_place_recommendation',
      arguments: {
        mood: 'calm',
        count: 1,
      },
    });
    console.log('Result:', JSON.parse(placeResult.content[0].text));
    console.log();

    // Test 7: Read mood categories resource
    console.log('📋 Test 7: Reading mood://categories resource...');
    const categoriesResource = await client.readResource({
      uri: 'mood://categories',
    });
    console.log('Result:', JSON.parse(categoriesResource.contents[0].text));
    console.log();

    // Test 8: Add to history
    console.log('📋 Test 8: Testing add_to_history...');
    const historyResult = await client.callTool({
      name: 'add_to_history',
      arguments: {
        mood: 'happy',
        input: 'Test entry for happy mood',
      },
    });
    console.log('Result:', JSON.parse(historyResult.content[0].text));
    console.log();

    // Test 9: Read history
    console.log('📋 Test 9: Reading mood://history resource...');
    const historyResource = await client.readResource({
      uri: 'mood://history',
    });
    console.log('Result:', JSON.parse(historyResource.contents[0].text));
    console.log();

    console.log('✅ All tests completed successfully!');
    console.log('\n🎉 MCP Server is working perfectly!\n');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    await client.close();
    serverProcess.kill();
  }
}

testMCPServer().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
