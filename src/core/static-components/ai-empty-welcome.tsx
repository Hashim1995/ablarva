import './ai-loader.scss';

function AiEmptyWelcome() {
  return (
    <div className="  h-full">
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
        <h2 className="text-white text-center ">
          Ağlında sual var? Bizim hörmətli Ai-zadə cavablandırmağa hazırdı! 😊
        </h2>
      </div>
    </div>
  );
}

export default AiEmptyWelcome;
