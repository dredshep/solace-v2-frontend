type DivProps = React.HTMLAttributes<HTMLDivElement>

// prettier-ignore
const composer = <P extends DivProps>(Component: React.FC<P>) => (additionalClasses: string) => {
  const ComposedComponent: React.FC<P> = (props) => <Component {...props} className={`${props.className || ''} ${additionalClasses}`} />;
  ComposedComponent.displayName = `Composed(${Component.displayName || Component.name})`;
  return ComposedComponent;
};

// prettier-ignore
const FirstCellInRowBase: React.FC<DivProps> = (props) => {
  return <div {...props} className={`bg-backgroundInteractive p-4 flex items-center ${props.className}`} />;
};
FirstCellInRowBase.displayName = 'FirstCellInRowBase'

// prettier-ignore
const JustifyEndFirstCellInRow = composer(FirstCellInRowBase)('justify-end');

// this is a fail; it doesn't render it, since bg-accent is not defined anywhere as a proper class for tailwind to compile
// prettier-ignore
const BackgroundSurfaceFirstCellInRow = composer(FirstCellInRowBase)('bg-accent');

// prettier-ignore
const JustifyEndAndBackgroundSurfaceFirstCellInRow = composer(JustifyEndFirstCellInRow)('bg-accent');

// prettier-ignore
const App = () => {
  return (
    <div>
      <JustifyEndFirstCellInRow>Justify End</JustifyEndFirstCellInRow>
      <BackgroundSurfaceFirstCellInRow>Background Surface</BackgroundSurfaceFirstCellInRow>
      <JustifyEndAndBackgroundSurfaceFirstCellInRow>Both Styles</JustifyEndAndBackgroundSurfaceFirstCellInRow>
    </div>
  );
};

export default App
