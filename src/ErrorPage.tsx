import { useRouteError } from "react-router-dom";
import { Button } from "./components/ui/button";

export function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col mx-auto max-w-5xl items-center gap-4 h-screen justify-center"
    >
      <h1 className="text-5xl">Oops!</h1>
      <p>Desculpe, um erro não esperado aconteceu...</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button>
        <a href="/">Voltar para Página Principal</a>
      </Button>
    </div>
  );
}
