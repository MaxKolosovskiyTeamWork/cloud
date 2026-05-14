const API_URL = "https://mycontainerapp.orangecoast-5235d63e.swedencentral.azurecontainerapps.io/test";

const AUTH_TOKEN = "";

interface LabPayload {
  sensorId: number;
  labId: string;
  measurement: number;
  unit: string;
  timestamp: string;
  notes?: Record<string, string>;
}

const payload: LabPayload = {
  sensorId: 1,
  labId: "lab-1",
  measurement: 0,
  unit: "C",
  timestamp: new Date().toISOString(),
  notes: { purpose: "load-test" },
};

const TOTAL_REQUESTS = 1000;

async function sendRequest(index: number): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    console.log(`Request ${index + 1}: ${response.status}`);
  } catch (err) {
    console.error(`Request ${index + 1} failed:`, err);
  }
}

(async () => {
  const tasks: Promise<void>[] = [];

  for (let i = 0; i < TOTAL_REQUESTS; i++) {
    tasks.push(sendRequest(i));
  }

  await Promise.all(tasks);
})();