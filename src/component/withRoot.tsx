import { Header } from "../ui/Header";

interface RootProps {
  children?: React.ReactNode;
}

export function withRoot<T extends RootProps = RootProps>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T) => (
    <div className="app-container">
      <header className="app-header">
        <Header />
      </header>
      <main className="app-body">
        <WrappedComponent {...props} />
      </main>
      <footer className="app-footer" />
    </div>
  );
}
