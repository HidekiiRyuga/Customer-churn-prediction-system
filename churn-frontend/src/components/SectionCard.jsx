import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import { vscDarkPlus }
from "react-syntax-highlighter/dist/esm/styles/prism";

function SectionCard({
  title,
 code ,
  explanation,
  output,
  images = [],
  insight
}){

  return (

    <div className="
    mb-16
    w-full
    max-w-full
    overflow-hidden
    ">

      <h1 className="text-4xl font-bold mb-8 text-blue-400">
        {title}
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* CODE BLOCK */}
        <div className="
        bg-gray-900
        rounded-3xl
        p-4
        md:p-6
        shadow-2xl
        overflow-x-auto
        max-w-full
        border
        border-gray-800
        ">

          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            Code
          </h2>

            <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
                borderRadius: "1rem",
                padding: "1.5rem",
                fontSize: "0.9rem",
                background: "#111827"
            }}
            lineProps={{
                style: {
                backgroundColor: "transparent"
                }
            }}
            wrapLongLines={true}
            >

            {code.trim()}

            </SyntaxHighlighter>

        </div>

        {/* EXPLANATION */}
        <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-800">

          <h2 className="text-2xl font-semibold mb-4 text-purple-400">
            Explanation
          </h2>
        <div className="text-gray-300 leading-relaxed text-lg space-y-4">

        {(explanation || "").split("\n").map((line, index) => (

            <p key={index}>
            {line}
            </p>

        ))}

        </div>

          {insight && (

            <div className="mt-6 bg-blue-950 border border-blue-700 rounded-2xl p-4">

              <h3 className="text-lg font-bold text-blue-300 mb-2">
                Key Insight
              </h3>

              <p className="text-gray-200">
                {insight}
              </p>

            </div>

          )}

          {output && (

            <div className="mt-6">

              <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                Output
              </h3>

              <div className="
                bg-gray-800
                rounded-2xl
                p-4
                text-gray-200
                whitespace-pre-wrap
                font-mono
                text-sm
                overflow-x-auto
                max-w-full
                break-words
                ">
                {output}
                </div>

            </div>

          )}

        </div>

      </div>

      {/* IMAGE */}
        {images.length > 0 && (

        <div className={`
        mt-8
        gap-8
        ${
            images.some(img => img.sideBySide)
            ? "grid grid-cols-1 md:grid-cols-2 place-items-center"
            : "flex flex-col items-center"
        }
        `}>
        {images.map((imgObj, index) => (

        <div
            key={index}
            className="w-full flex justify-center"
        >

            <img
        src={imgObj.src}
        alt={`Visualization ${index}`}
        className={`
            rounded-3xl
            border
            border-gray-800
            shadow-2xl
            object-contain
            w-full
            h-auto
            mx-auto
            max-w-full
            ${imgObj.size || "max-w-2xl"}
        `}
        />

        </div>

        ))}
        </div>

        )}

    </div>

  );
}

export default SectionCard;