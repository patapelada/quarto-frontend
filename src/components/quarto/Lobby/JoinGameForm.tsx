import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGameContext } from "@/context/GameContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function JoinGameForm() {
  const game = useGameContext();
  const formSchema = z.object({
    gameId: z.string().regex(/^#[A-Z0-9]{4}$/, {
      message:
        "Game ID must start with # followed by 4 alphanumeric characters",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameId: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    game.joinGame(values.gameId);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xs">
        <FormField
          control={form.control}
          name="gameId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game ID</FormLabel>
              <FormControl>
                <div className="flex w-full items-center gap-2">
                  <Input placeholder="#1234" {...field} />
                  <Button type="submit">Join</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
