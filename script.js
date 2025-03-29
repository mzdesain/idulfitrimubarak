const twibbonImg = document.getElementById("twibbonImg");
const inputName = document.getElementById("inputName");
const inputPosition = document.getElementById("inputPosition");
const downloadBtn = document.getElementById("downloadBtn");

function updateText() {
    document.getElementById("name").innerText = inputName.value || "Nama";
    document.getElementById("position").innerText = inputPosition.value || "Keterangan";
    downloadBtn.disabled = !(inputName.value || inputPosition.value);
}

async function loadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Gagal memuat gambar. Pastikan URL gambar mengizinkan akses cross-origin."));
    });
}

async function downloadTwibbon() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    const CANVAS_SIZE = 1000;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    try {
        let img = await loadImage(twibbonImg.src);
        ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

        ctx.fillStyle = "#2887bf";
        ctx.textAlign = "center";

        ctx.font = "bold 30px Gotham, Montserrat, sans-serif";
        const nameY = CANVAS_SIZE - 120;
        ctx.fillText(inputName.value || "Nama", CANVAS_SIZE / 2, nameY);

        ctx.font = "20px Gotham, Montserrat, sans-serif";
        const positionY = nameY + 30;
        ctx.fillText(inputPosition.value || "Keterangan", CANVAS_SIZE / 2, positionY);

        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "Tahniah Idulfitri 1446 H.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        alert(error.message);
    }
}
