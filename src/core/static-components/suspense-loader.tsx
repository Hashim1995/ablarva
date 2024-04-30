import './ai-loader.scss';

/**
 * Renders a loader component to be used with React Suspense.
 */
function SuspenseLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen dark:gradient-bg">
      <div className="flex-col justify-center items-center w-full h-full">
        <div className="flex justify-center items-center h-3/5 palette-2">
          <div className="blobsWelcome">
            <svg viewBox="0 0 1200 1200">
              <g className="blob blob-1">
                <path />
              </g>
              <g className="blob blob-2">
                <path />
              </g>
              <g className="blob blob-3">
                <path />
              </g>
              <g className="blob blob-4">
                <path />
              </g>
              <g className="alt blob blob-1">
                <path />
              </g>
              <g className="alt blob blob-2">
                <path />
              </g>
              <g className="alt blob blob-3">
                <path />
              </g>
              <g className="alt blob blob-4">
                <path />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuspenseLoader;
