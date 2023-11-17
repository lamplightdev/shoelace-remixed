import { SlButton, SlDrawer, SlIcon, SlInput, SlTab, SlTabGroup, SlTabPanel } from '@shoelace-style/shoelace/dist/react';
import { createContext, useEffect, useRef, useState } from 'react';

const nullComponent = () => null;

type ShoelaceComponents = {
  SlButton: typeof nullComponent | typeof SlButton;
  SlInput: typeof nullComponent | typeof SlInput;
  SlDrawer: typeof nullComponent | typeof SlDrawer;
  SlIcon: typeof nullComponent | typeof SlIcon;
  SlTabGroup: typeof nullComponent | typeof SlTabGroup;
  SlTab: typeof nullComponent | typeof SlTab;
  SlTabPanel: typeof nullComponent | typeof SlTabPanel;
};

const nullComponents: ShoelaceComponents = {
  SlButton: () => null,
  SlInput: () => null,
  SlDrawer: () => null,
  SlIcon: () => null,
  SlTabGroup: () => null,
  SlTab: () => null,
  SlTabPanel: () => null,
};

export const ShoelaceContext = createContext(nullComponents);

export function useShoelace({ URL }: { URL: string }) {
  const loaded = useRef(false);

  const [components, setComponents] = useState<ShoelaceComponents>(nullComponents);

  useEffect(() => {
    if (loaded.current) {
      return;
    }

    loaded.current = true;

    import('@shoelace-style/shoelace/dist/utilities/base-path.js').then(
      async ({ setBasePath }) => {
        setBasePath(`${URL}/shoelace`);

        import('@shoelace-style/shoelace/dist/react').then((result) => {
          setComponents({
            SlButton: result.SlButton,
            SlInput: result.SlInput,
            SlDrawer: result.SlDrawer,
            SlIcon: result.SlIcon,
            SlTabGroup: result.SlTabGroup,
            SlTab: result.SlTab,
            SlTabPanel: result.SlTabPanel,
          });
        });
      }
    );
  }, [URL]);

  return components;
}
