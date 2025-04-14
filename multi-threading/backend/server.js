const { Worker } = require('worker_threads');

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function run() {
  const tasks = [20, 25, 30, 35]; 
  const promises = tasks.map(task => runWorker(task));
  
  const results = await Promise.all(promises);
  console.log('Results from workers:', results);
}

run().catch(err => console.error(err));
