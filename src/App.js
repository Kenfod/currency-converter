// import { useEffect, useState } from "react";

// export default function App() {
//   const [amount, setAmount] = useState(1);
//   const [fromCur, setFromCur] = useState("EUR");
//   const [toCur, setToCur] = useState("USD");
//   const [converted, setConverted] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const controller = new AbortController();

//     async function convert() {
//       try {
//         setIsLoading(true);
//         setError("");

//         const res = await fetch(
//           `https://open.er-api.com/v6/latest/${fromCur}`,
//           {
//             signal: controller.signal,
//           },
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch exchange rates.");
//         }

//         const data = await res.json();

//         if (data.result !== "success") {
//           throw new Error("Unable to retrieve exchange rates.");
//         }

//         const rate = data.rates?.[toCur];

//         if (rate === undefined) {
//           throw new Error(`Exchange rate for ${toCur} is unavailable.`);
//         }

//         setConverted(Number(amount) * rate);
//       } catch (error) {
//         if (error.name !== "AbortError") {
//           console.error(error);
//           setError("Unable to fetch exchange rates.");
//           setConverted("");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     if (amount === "" || Number.isNaN(Number(amount)) || Number(amount) < 0) {
//       setConverted("");
//       setError("");
//       return;
//     }

//     if (fromCur === toCur) {
//       setConverted(Number(amount));
//       setError("");
//       return;
//     }

//     convert();

//     return () => {
//       controller.abort();
//     };
//   }, [amount, fromCur, toCur]);

//   return (
//     <div style={styles.appContainer}>
//       <div style={styles.converterCard}>
//         <h1 style={styles.title}>Currency Converter</h1>

//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Amount to Convert</label>

//           <input
//             type="number"
//             min="0"
//             value={amount}
//             onChange={(e) =>
//               setAmount(e.target.value === "" ? "" : Number(e.target.value))
//             }
//             style={styles.input}
//             placeholder="Enter amount..."
//           />
//         </div>

//         <div style={styles.selectRow}>
//           <div style={styles.selectGroup}>
//             <label style={styles.label}>From</label>

//             <select
//               value={fromCur}
//               onChange={(e) => setFromCur(e.target.value)}
//               style={styles.select}
//             >
//               <option value="USD">🇺🇸 USD</option>
//               <option value="EUR">🇪🇺 EUR</option>
//               <option value="CAD">🇨🇦 CAD</option>
//               <option value="INR">🇮🇳 INR</option>
//             </select>
//           </div>

//           <div style={styles.arrowIcon}>⇄</div>

//           <div style={styles.selectGroup}>
//             <label style={styles.label}>To</label>

//             <select
//               value={toCur}
//               onChange={(e) => setToCur(e.target.value)}
//               style={styles.select}
//             >
//               <option value="USD">🇺🇸 USD</option>
//               <option value="EUR">🇪🇺 EUR</option>
//               <option value="CAD">🇨🇦 CAD</option>
//               <option value="INR">🇮🇳 INR</option>
//             </select>
//           </div>
//         </div>

//         <div style={styles.resultContainer}>
//           {isLoading ? (
//             <p style={styles.loadingText}>Fetching exchange rates...</p>
//           ) : error ? (
//             <p style={styles.errorText}>{error}</p>
//           ) : (
//             <>
//               <p style={styles.conversionFormula}>
//                 {amount || 0} {fromCur} =
//               </p>

//               <p style={styles.resultText}>
//                 {converted !== "" && converted !== undefined
//                   ? Number(converted).toFixed(2)
//                   : "0.00"}{" "}
//                 {toCur}
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   appContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6",
//     fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//     padding: "20px",
//   },

//   converterCard: {
//     backgroundColor: "#ffffff",
//     padding: "32px",
//     borderRadius: "16px",
//     boxShadow:
//       "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "420px",
//   },

//   title: {
//     margin: "0 0 24px 0",
//     fontSize: "24px",
//     fontWeight: "700",
//     color: "#1f2937",
//     textAlign: "center",
//   },

//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "20px",
//   },

//   label: {
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#6b7280",
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//     marginBottom: "6px",
//   },

//   input: {
//     padding: "12px 16px",
//     fontSize: "16px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     color: "#1f2937",
//     backgroundColor: "#f9fafb",
//     transition: "border-color 0.2s",
//   },

//   selectRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: "12px",
//     marginBottom: "28px",
//   },

//   selectGroup: {
//     display: "flex",
//     flexDirection: "column",
//     flex: 1,
//   },

//   select: {
//     padding: "12px",
//     fontSize: "15px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     backgroundColor: "#f9fafb",
//     color: "#1f2937",
//     cursor: "pointer",
//   },

//   arrowIcon: {
//     fontSize: "20px",
//     color: "#9ca3af",
//     marginTop: "18px",
//     userSelect: "none",
//   },

//   resultContainer: {
//     backgroundColor: "#f8fafc",
//     border: "1px solid #f1f5f9",
//     borderRadius: "12px",
//     padding: "20px",
//     textAlign: "center",
//     minHeight: "84px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//   },

//   conversionFormula: {
//     margin: "0 0 4px 0",
//     fontSize: "14px",
//     color: "#6b7280",
//     fontWeight: "500",
//   },

//   resultText: {
//     margin: 0,
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "#2563eb",
//   },

//   loadingText: {
//     margin: 0,
//     fontSize: "15px",
//     color: "#4b5563",
//     fontStyle: "italic",
//   },

//   errorText: {
//     margin: 0,
//     fontSize: "15px",
//     color: "#dc2626",
//     fontWeight: "500",
//   },
// };

// import { useEffect, useState } from "react";

// export default function App() {
//   const [amount, setAmount] = useState(1);
//   const [fromCur, setFromCur] = useState("EUR");
//   const [toCur, setToCur] = useState("USD");
//   const [converted, setConverted] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const controller = new AbortController();

//     async function convert() {
//       try {
//         setIsLoading(true);
//         setError("");

//         const res = await fetch(
//           `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`,
//           {
//             signal: controller.signal,
//           },
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch exchange rates.");
//         }

//         const data = await res.json();

//         if (!data.rates || data.rates[toCur] === undefined) {
//           throw new Error("Exchange rate unavailable.");
//         }

//         setConverted(data.rates[toCur]);
//       } catch (error) {
//         if (error.name !== "AbortError") {
//           console.error(error);
//           setError("Unable to fetch exchange rates.");
//           setConverted("");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     if (amount === "" || Number.isNaN(Number(amount)) || Number(amount) < 0) {
//       setConverted("");
//       setError("");
//       return;
//     }

//     if (fromCur === toCur) {
//       setConverted(Number(amount));
//       setError("");
//       return;
//     }

//     convert();

//     return () => {
//       controller.abort();
//     };
//   }, [amount, fromCur, toCur]);

//   return (
//     <div style={styles.appContainer}>
//       {" "}
//       <div style={styles.converterCard}>
//         {" "}
//         <h1 style={styles.title}>Currency Converter</h1>
//         <div style={styles.inputGroup}>
//           <label style={styles.label}>Amount to Convert</label>

//           <input
//             type="number"
//             min="0"
//             value={amount}
//             onChange={(e) =>
//               setAmount(e.target.value === "" ? "" : Number(e.target.value))
//             }
//             style={styles.input}
//             placeholder="Enter amount..."
//           />
//         </div>
//         <div style={styles.selectRow}>
//           <div style={styles.selectGroup}>
//             <label style={styles.label}>From</label>

//             <select
//               value={fromCur}
//               onChange={(e) => setFromCur(e.target.value)}
//               style={styles.select}
//             >
//               <option value="USD">🇺🇸 USD</option>
//               <option value="EUR">🇪🇺 EUR</option>
//               <option value="CAD">🇨🇦 CAD</option>
//               <option value="INR">🇮🇳 INR</option>
//             </select>
//           </div>

//           <div style={styles.arrowIcon}>⇄</div>

//           <div style={styles.selectGroup}>
//             <label style={styles.label}>To</label>

//             <select
//               value={toCur}
//               onChange={(e) => setToCur(e.target.value)}
//               style={styles.select}
//             >
//               <option value="USD">🇺🇸 USD</option>
//               <option value="EUR">🇪🇺 EUR</option>
//               <option value="CAD">🇨🇦 CAD</option>
//               <option value="INR">🇮🇳 INR</option>
//             </select>
//           </div>
//         </div>
//         <div style={styles.resultContainer}>
//           {isLoading ? (
//             <p style={styles.loadingText}>Fetching exchange rates...</p>
//           ) : error ? (
//             <p style={styles.errorText}>{error}</p>
//           ) : (
//             <>
//               <p style={styles.conversionFormula}>
//                 {amount || 0} {fromCur} =
//               </p>

//               <p style={styles.resultText}>
//                 {converted !== "" && converted !== undefined
//                   ? Number(converted).toFixed(2)
//                   : "0.00"}{" "}
//                 {toCur}
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   appContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6",
//     fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
//     padding: "20px",
//   },

//   converterCard: {
//     backgroundColor: "#ffffff",
//     padding: "32px",
//     borderRadius: "16px",
//     boxShadow:
//       "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "420px",
//   },

//   title: {
//     margin: "0 0 24px 0",
//     fontSize: "24px",
//     fontWeight: "700",
//     color: "#1f2937",
//     textAlign: "center",
//   },

//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "20px",
//   },

//   label: {
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#6b7280",
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//     marginBottom: "6px",
//   },

//   input: {
//     padding: "12px 16px",
//     fontSize: "16px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     color: "#1f2937",
//     backgroundColor: "#f9fafb",
//     transition: "border-color 0.2s",
//   },

//   selectRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: "12px",
//     marginBottom: "28px",
//   },

//   selectGroup: {
//     display: "flex",
//     flexDirection: "column",
//     flex: 1,
//   },

//   select: {
//     padding: "12px",
//     fontSize: "15px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     backgroundColor: "#f9fafb",
//     color: "#1f2937",
//     cursor: "pointer",
//   },

//   arrowIcon: {
//     fontSize: "20px",
//     color: "#9ca3af",
//     marginTop: "18px",
//     userSelect: "none",
//   },

//   resultContainer: {
//     backgroundColor: "#f8fafc",
//     border: "1px solid #f1f5f9",
//     borderRadius: "12px",
//     padding: "20px",
//     textAlign: "center",
//     minHeight: "84px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//   },

//   conversionFormula: {
//     margin: "0 0 4px 0",
//     fontSize: "14px",
//     color: "#6b7280",
//     fontWeight: "500",
//   },

//   resultText: {
//     margin: 0,
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "#2563eb",
//   },

//   loadingText: {
//     margin: 0,
//     fontSize: "15px",
//     color: "#4b5563",
//     fontStyle: "italic",
//   },

//   errorText: {
//     margin: 0,
//     fontSize: "15px",
//     color: "#dc2626",
//     fontWeight: "500",
//   },
// };

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

// import { useEffect, useState } from "react";

// export default function App() {
//   const [amount, setAmount] = useState(1);
//   const [fromCur, setFromCur] = useState("EUR");
//   const [toCur, setToCur] = useState("USD");
//   const [converted, setConverted] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(
//     function () {
//       async function convert() {
//         setIsLoading(true);
//         const res = await fetch(
//           `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`,
//         );
//         const data = await res.json();
//         setConverted(data.rates[toCur]);
//         setIsLoading(false);
//         // console.log(data);
//       }

//       if (fromCur === toCur) return setConverted(amount);
//       convert();
//     },
//     [amount, fromCur, toCur],
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         disabled={isLoading}
//       />
//       <select
//         value={fromCur}
//         onChange={(e) => setFromCur(e.target.value)}
//         disabled={isLoading}
//       >
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       <select
//         value={toCur}
//         onChange={(e) => setToCur(e.target.value)}
//         disabled={isLoading}
//       >
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       <p>
//         {converted} {toCur}
//       </p>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [output, setOutput] = useState(""); // Track converted amount

  useEffect(
    function () {
      // 1. Skip API call if currencies are identical
      if (fromCur === toCur) {
        setOutput(amount);
        return;
      }

      async function convert() {
        try {
          // 2. Added a public CORS proxy to bypass localhost block
          const proxy = "https://herokuapp.com";
          const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`;

          const res = await fetch(proxy + url);
          const data = await res.json();

          // 3. Extract rates from the nested API object
          setOutput(data.rates[toCur]);
        } catch (error) {
          console.error("Conversion error:", error);
        }
      }

      convert();
    },
    // 4. Added dependencies so the effect re-runs when inputs change
    [amount, fromCur, toCur],
  );

  return (
    <div>
      <input
        type="number" // Changed to number type
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {/* 5. Rendered the actual output */}
      <p>
        {output} {toCur}
      </p>
    </div>
  );
}
