interface Props {
  handleRefreshAfterAction: () => void;
}

export default function NavBar(props: Props): JSX.Element {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container justify-content-between">
        <a className="navbar-brand" href="/">
          📋 &nbsp; PasteBin
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => props.handleRefreshAfterAction()}
        >
          Create New Snippet
        </button>
      </div>
    </nav>
  );
}
