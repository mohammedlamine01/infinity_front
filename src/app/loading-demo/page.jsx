'use client';

import { useState } from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import { useAsyncLoad } from '@/hooks/useAsyncLoad';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoadingDemo() {
  const { startLoading, stopLoading, updateProgress, updateMessage } = useLoading();
  const { withLoading, withLoadingAndProgress } = useAsyncLoad();
  const [lastResult, setLastResult] = useState('');

  // Demo 1: Simple Loading
  const demoSimpleLoading = async () => {
    await withLoading(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastResult('Simple loading completed!');
    }, 'Loading data...');
  };

  // Demo 2: Loading with Progress
  const demoLoadingWithProgress = async () => {
    await withLoadingAndProgress(
      async (updateProgress, updateMessage) => {
        updateMessage('Starting process...');
        updateProgress(0);
        await new Promise(resolve => setTimeout(resolve, 500));

        updateMessage('Loading step 1...');
        updateProgress(25);
        await new Promise(resolve => setTimeout(resolve, 500));

        updateMessage('Loading step 2...');
        updateProgress(50);
        await new Promise(resolve => setTimeout(resolve, 500));

        updateMessage('Loading step 3...');
        updateProgress(75);
        await new Promise(resolve => setTimeout(resolve, 500));

        updateMessage('Finalizing...');
        updateProgress(100);
        await new Promise(resolve => setTimeout(resolve, 500));

        setLastResult('Progress loading completed!');
      },
      { message: 'Processing...' }
    );
  };

  // Demo 3: Simulated API Calls
  const demoAPICall = async () => {
    await withLoading(async () => {
      // Simulate multiple API calls
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 1000)),
        new Promise(resolve => setTimeout(resolve, 1500)),
        new Promise(resolve => setTimeout(resolve, 800)),
      ]);
      setLastResult('API calls completed!');
    }, 'Fetching data from API...');
  };

  // Demo 4: File Upload Simulation
  const demoFileUpload = async () => {
    startLoading('Uploading file...');
    
    try {
      for (let i = 0; i <= 100; i += 10) {
        updateProgress(i);
        updateMessage(`Uploading: ${i}%`);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      setLastResult('File upload completed!');
    } finally {
      stopLoading();
    }
  };

  // Demo 5: Multi-step Process
  const demoMultiStep = async () => {
    startLoading('Starting multi-step process...');
    
    try {
      updateMessage('Step 1: Validating data...');
      updateProgress(20);
      await new Promise(resolve => setTimeout(resolve, 800));

      updateMessage('Step 2: Processing payment...');
      updateProgress(40);
      await new Promise(resolve => setTimeout(resolve, 800));

      updateMessage('Step 3: Updating database...');
      updateProgress(60);
      await new Promise(resolve => setTimeout(resolve, 800));

      updateMessage('Step 4: Sending confirmation...');
      updateProgress(80);
      await new Promise(resolve => setTimeout(resolve, 800));

      updateMessage('Complete!');
      updateProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));

      setLastResult('Multi-step process completed!');
    } finally {
      stopLoading();
    }
  };

  // Demo 6: Long Loading (Only Loading Bar)
  const demoLongLoading = async () => {
    await withLoading(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      setLastResult('Long operation completed!');
    }, 'This will take a few seconds...');
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Loading System Demo</h1>
          <p className="text-muted-foreground">
            Test different loading scenarios and see the system in action
          </p>
        </div>

        {lastResult && (
          <Card className="border-primary/50">
            <CardContent className="pt-6">
              <p className="text-center text-lg font-medium text-primary">
                {lastResult}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Demo 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Simple Loading</CardTitle>
              <CardDescription>
                Basic loading overlay with message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={demoSimpleLoading} className="w-full">
                Start Simple Loading
              </Button>
            </CardContent>
          </Card>

          {/* Demo 2 */}
          <Card>
            <CardHeader>
              <CardTitle>Loading with Progress</CardTitle>
              <CardDescription>
                Loading with progress bar and step updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={demoLoadingWithProgress} className="w-full">
                Start Progress Loading
              </Button>
            </CardContent>
          </Card>

          {/* Demo 3 */}
          <Card>
            <CardHeader>
              <CardTitle>API Call Simulation</CardTitle>
              <CardDescription>
                Simulate multiple parallel API calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={demoAPICall} className="w-full">
                Fetch from API
              </Button>
            </CardContent>
          </Card>

          {/* Demo 4 */}
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>
                Simulate file upload with progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={demoFileUpload} className="w-full">
                Upload File
              </Button>
            </CardContent>
          </Card>

          {/* Demo 5 */}
          <Card>
            <CardHeader>
              <CardTitle>Multi-Step Process</CardTitle>
              <CardDescription>
                Complex operation with multiple steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={demoMultiStep} className="w-full">
                Start Process
              </Button>
            </CardContent>
          </Card>

          {/* Demo 6 */}
          <Card>
            <CardHeader>
              <CardTitle>Long Operation</CardTitle>
              <CardDescription>
                Longer loading to see the animation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={demoLongLoading} className="w-full">
                Start Long Loading
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">🎯 Key Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Full-page loading overlay with spinner</li>
                <li>Top loading bar (NProgress style)</li>
                <li>Custom loading messages</li>
                <li>Progress tracking (0-100%)</li>
                <li>Smooth fade transitions</li>
                <li>Easy-to-use hooks</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">📦 Usage:</h3>
              <pre className="bg-background p-4 rounded-lg text-xs overflow-x-auto">
{`import { useAsyncLoad } from '@/hooks/useAsyncLoad';

const { withLoading } = useAsyncLoad();

await withLoading(async () => {
  // Your async operation
}, 'Loading message...');`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">📚 Documentation:</h3>
              <p className="text-sm text-muted-foreground">
                Check <code className="bg-background px-2 py-1 rounded">LOADING_SYSTEM_GUIDE.md</code> for complete documentation and more examples.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
