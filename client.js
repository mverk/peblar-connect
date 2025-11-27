const API_URL_METER = "http://...:14500/meter";
const API_URL_EV = "http://...:14500/evinterface";
const API_URL_SYSTEM = "http://...:14500/system";

function setText(id, value) {
    document.getElementById(id).textContent = value;
}

function renderCodeBox(containerId, codes, color) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (!codes || codes.length === 0) {
        container.innerHTML = `<p class="text-gray-400">None</p>`;
        return;
    }

    codes.forEach(code => {
        const box = document.createElement("div");
        box.className = `px-4 py-2 rounded-xl text-white font-semibold bg-${color}-700`;
        box.textContent = code;
        container.appendChild(box);
    });
}

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${d}d ${h}h ${m}m ${s}s`;
}


async function loadData() {
    try {
        // ---- METER DATA ----
        const resMeter = await fetch(API_URL_METER);
        const data = await resMeter.json();

        // ---- EV DATA ----
        const resEV = await fetch(API_URL_EV);
        const data_ev = await resEV.json();

        // ---- SYSTEM DATA ----
        const resSystem = await fetch(API_URL_SYSTEM);
        const data_system = await resSystem.json();

        // ---- LIVE POWER ----
        setText("l1wattage", data.PowerPhase1 + " W");
        setText("l2wattage", data.PowerPhase2 + " W");
        setText("l3wattage", data.PowerPhase3 + " W");

        // ---- LIMITS ----
        setText("chargelimit", (data_ev.ChargeCurrentLimit / 1000) + " A");
        setText("chargelimitreason", data_ev.ChargeCurrentLimitSource ?? "Unknown");

        // ---- DEVICE INFO ----
        setText("productpn", data_system.ProductPn);
        setText("productsn", data_system.ProductSn);
        setText("firmware", data_system.FirmwareVersion);
        setText("uptime", formatUptime(data_system.Uptime));

        // ---- ERRORS & WARNINGS ----
        renderCodeBox("errorcodes", data_system.ActiveErrorCodes, "red");
        renderCodeBox("warningcodes", data_system.ActiveWarningCodes, "yellow");

        const state = data_ev.CpState;

        if(state === "State A") {
            renderCodeBox("state", ["No EV Connected"], "green");
        }
        else if(state === "State B") {
            renderCodeBox("state", ["EV connected but suspended by either EV or charger"], "red");
        }
        else if(state === "State C") {
            renderCodeBox("state", ["EV connected and charging"], "green");
        }
        else if(state === "State D") {
            renderCodeBox("state", ["EV connected and charging (ventilation requested)"], "yellow");
        }
        else if(state === "State E") {
            renderCodeBox("state", ["Error, short to PE or powered off"], "red");
        }
        else if(state === "State F") {
            renderCodeBox("state", ["Fault detected by charger"], "red");
        }
        else if(state === "Invalid") {
            renderCodeBox("state", ["Invalid CP level measured"], "red");
        }
        else if(state === "Unknown") {
            renderCodeBox("state", ["CP signal cannot be measured."], "red");
        }
        else {
            renderCodeBox("state", ["State is unknown"], "yellow");
        }

    } catch (err) {
        console.error("Fetch error:", err);
    }
}

setInterval(loadData, 2000);
loadData();
