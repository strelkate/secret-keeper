export default function initGoWasm(path) {
    const go = new Go();
    WebAssembly.instantiateStreaming(fetch(path), go.importObject).then((result) => {
        go.run(result.instance);
    });
}
