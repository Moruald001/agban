import { useMutation } from "@tanstack/react-query";

export function mutate(fetcher) {
  const { mutateAsync } = useMutation({
    mutationFn: fetcher,
  });
  return mutateAsync;
}
