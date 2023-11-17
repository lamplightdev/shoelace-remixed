import { ActionFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useContext, useState } from 'react';
import { ShoelaceContext } from '~/shoelace';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = formData.get('name') as string;

  return json({ name });
}

export default function Index() {
  const { SlButton, SlInput, SlDrawer, SlIcon } = useContext(ShoelaceContext);
  const { name } = useActionData<typeof action>() ?? {};

  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>Welcome to Shoelace Remixed</h1>

      {name ? <h2>👋 {name}</h2> : null}

      <Form method="post">
        <SlInput name="name" placeholder="What's your name?">
          <SlIcon name="chat" slot="prefix"></SlIcon>
        </SlInput>

        <SlButton type="submit">Say hi</SlButton>
      </Form>

      <SlDrawer
        label="Drawer"
        className="drawer-overview"
        open={open}
        onSlHide={() => setOpen(false)}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <SlButton
          slot="footer"
          variant="primary"
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </SlButton>
      </SlDrawer>

      <SlButton onClick={() => setOpen(true)}>Open Drawer</SlButton>
    </div>
  );
}
