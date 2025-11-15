import { Button, Input, Radio } from "@/components/ui";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 md:px-0">
      <div>
        <Button variant="primary">Hello there</Button>
        <Button variant="secondary" isLoading>
          Hello there
        </Button>
        <Button variant="outline">Hello there</Button>

        <div className="mt-4">
          <Radio
            label="Belyfted Pay"
            description="Pay from your Belyfted wallet or pay with your bank app, no cards need."
          />
          <br />
          <Radio label="Credit/Debit Card" />
        </div>

        <div className="mt-4">
          <Input label="Email" placeholder="Enter your email" />
        </div>

        <div className="mt-4">
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
        </div>
      </div>
    </div>
  );
}
