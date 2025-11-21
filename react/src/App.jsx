import React, { useState } from "react";
import Aurora from "./components/Aurora/Aurora.jsx";
import Notification from "./components/Notification/Notification.jsx";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const API_URL = "https://hill-ebook-protect-copyrights.trycloudflare.com";

const slidesData = [
    { id: "ARBOL", title: "Árbol de decisión", desc: "Es un modelo de predicción jerárquico que utiliza una estructura de diagrama de flujo para dividir datos recursivamente según reglas de decisión hasta llegar a una conclusión o clasificación.", params: ["inicio", "objetivo"], isAlgorithm: true },
    { id: "CHIMERGE", title: "Chi-Merge", desc: "Es un algoritmo de discretización supervisado que fusiona iterativamente intervalos numéricos adyacentes basándose en la similitud de sus distribuciones de clase medida mediante el estadístico Chi-cuadrado.", params: [], isAlgorithm: true },
    { id: "ESCALA_LOG", title: "Transformación logarítmica", desc: "Es una técnica de transformación que comprime rangos de valores extensos aplicando una función logarítmica, útil para normalizar distribuciones sesgadas y manejar datos con crecimiento exponencial.", params: ["nombre_columna"], isAlgorithm: true },
    { id: "ESTANDARIZACION", title: "Estandarización", desc: "Es una técnica de preprocesamiento que transforma los datos restando la media y dividiendo por la desviación estándar (Z-score) para centrarlos en cero con varianza unitaria.", params: ["nombre_columna"], isAlgorithm: true },
    { id: "NORMALIZACION", title: "Normalización", desc: "Es una técnica de reescalado que ajusta los valores numéricos para acotarlos dentro de un rango fijo, típicamente entre 0 y 1, utilizando los valores mínimo y máximo de la variable.", params: ["nombre_columna"], isAlgorithm: true },
    { id: "KMEDIAS", title: "K-Medias", desc: "Agrupamiento (clustering) no supervisado que particiona un conjunto de datos en k grupos distintos, asignando iterativamente cada punto al centroide más cercano para minimizar la varianza dentro de cada grupo.", params: [], isAlgorithm: true },
    { id: "KMODAS", title: "K-Modas", desc: "Es una variante del algoritmo k-means diseñada específicamente para datos categóricos, que sustituye las medias por modas para definir los centroides y utiliza una medida de disimilitud basada en el conteo de coincidencias simples (hamming distance).", params: [], isAlgorithm: true },

];

export default function App() {
    const [files, setFiles] = useState({});
    const [params, setParams] = useState({});
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [resultNotification, setResultNotification] = useState(null);

    const handleFileChange = (slideId, e) => {
        setFiles(prev => ({ ...prev, [slideId]: e.target.files[0] ?? null }));
    };

    const handleParamChange = (slideId, paramName, value) => {
        setParams(prev => ({ ...prev, [slideId]: { ...prev[slideId], [paramName]: value } }));
    };

    const handleRunAlgorithm = async (slide) => {
        const file = files[slide.id];
        if (!file) return setNotification({ message: "Por favor, selecciona un archivo.", type: "error" });

        setLoading(true);
        setNotification(null);
        setResultNotification(null);

        const formData = new FormData();
        formData.append("data_file", file);
        formData.append("algoritmo", slide.id);

        const currentParams = params[slide.id] || {};
        for (const paramName of slide.params) {
            if (!currentParams[paramName]?.trim()) {
                setLoading(false);
                return setNotification({ message: `El parámetro '${paramName}' es requerido.`, type: "error" });
            }
            formData.append(paramName, currentParams[paramName]);
        }

        try {
            const response = await fetch(`${API_URL}/algoritmos`, { method: 'POST', body: formData });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Error desconocido del servidor.");

            const resultText = data.resultado || JSON.stringify(data, null, 2);
            setResultNotification({ message: resultText, type: "success" });
            setNotification({ message: "¡Éxito! El análisis se completó.", type: "success" });

        } catch (error) {
            setNotification({ message: error.message, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            {resultNotification && (
                <Notification
                    message={resultNotification.message}
                    type={resultNotification.type}
                    onClose={() => setResultNotification(null)}
                    isResult={true}
                />
            )}
            <Aurora className="aurora-background" />
            <div className="hero-text">
                <h1 className="hero-title">Analytica Pro</h1>
                <p className="hero-subtitle">
                    Convertimos tus datos en decisiones inteligentes. Automatización y visualización.
                </p>
            </div>
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    <Carousel showThumbs={false} showStatus={false} emulateTouch>
                        {slidesData.map((s) => (
                            <div className="upload-card" key={s.id}>
                                <div className="algo-meta">
                                    <div className="algo-title">{s.title}</div>
                                    <div className="algo-desc">{s.desc}</div>
                                </div>
                                <label className="upload-label" htmlFor={`file-input-${s.id}`}>
                                    <input
                                        id={`file-input-${s.id}`}
                                        type="file"
                                        accept=".csv"
                                        className="upload-input"
                                        onChange={(e) => handleFileChange(s.id, e)}
                                    />
                                    <div className="upload-visual">
                                        {files[s.id] ? `Archivo: ${files[s.id].name}` : "Haz click para adjuntar archivo"}
                                    </div>
                                </label>
                                {s.isAlgorithm && (
                                    <>
                                        <div className="params-container">
                                            {s.params.map(paramName => (
                                                <input
                                                    key={paramName}
                                                    type="text"
                                                    placeholder={`${paramName}`}
                                                    className="param-input"
                                                    onChange={(e) => handleParamChange(s.id, paramName, e.target.value)}
                                                />
                                            ))}
                                        </div>
                                        <button className="run-button" onClick={() => handleRunAlgorithm(s)} disabled={loading || !files[s.id]}>
                                            {loading ? "Procesando..." : "Ejecutar"}
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}