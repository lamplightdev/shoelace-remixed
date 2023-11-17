import { useContext } from 'react';
import { ShoelaceContext } from '~/shoelace';

export default function Info() {
  const { SlTabGroup, SlTab, SlTabPanel } = useContext(ShoelaceContext);

  return (
    <SlTabGroup>
      <SlTab slot="nav" panel="general">
        General
      </SlTab>
      <SlTab slot="nav" panel="custom">
        Custom
      </SlTab>
      <SlTab slot="nav" panel="advanced">
        Advanced
      </SlTab>
      <SlTab slot="nav" panel="disabled" disabled>
        Disabled
      </SlTab>

      <SlTabPanel name="general">This is the general tab panel.</SlTabPanel>
      <SlTabPanel name="custom">This is the custom tab panel.</SlTabPanel>
      <SlTabPanel name="advanced">This is the advanced tab panel.</SlTabPanel>
      <SlTabPanel name="disabled">This is a disabled tab panel.</SlTabPanel>
    </SlTabGroup>
  );
}
