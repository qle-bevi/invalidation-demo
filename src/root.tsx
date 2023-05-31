// @refresh reload
import { Links, Meta, Routes, Scripts } from 'solid-start/root';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Suspense, createRenderEffect } from 'solid-js';

export const hash = Math.floor(Math.random() * 90000) + 10;

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorBoundary
          fallback={(err, reset) => {
            console.error(err);
            // Have to use innerText here as `insertExpression` is broken by the same bug we are testing
            return (
              <>
                <h1>An error was caught</h1>
                <div>
                  <button onClick={() => reset()}>Reset</button>
                  <button onClick={() => window.location.reload()}>
                    Reload
                  </button>
                </div>
                <strong innerText={err.message} />
                <pre innerText={err.stack} />
              </>
            );
          }}
        >
          <Suspense>
            <Routes />
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
