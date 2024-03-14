import './ai-loader.scss';

/**
 * Renders a loader component to be used with React Suspense.
 */
function SuspenseLoader() {
  return (
    <div className="min-h-screen flex justify-center items-center gradient-bg">
      <div className=" flex-col  w-full h-full items-center	 justify-center ">
        <div className=" palette-2   flex items-center	 justify-center h-3/5 ">
          <div className="blobsWelcome ">
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
              <g className="blob blob-1 alt">
                <path />
              </g>
              <g className="blob blob-2 alt">
                <path />
              </g>
              <g className="blob blob-3 alt">
                <path />
              </g>
              <g className="blob blob-4 alt">
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
