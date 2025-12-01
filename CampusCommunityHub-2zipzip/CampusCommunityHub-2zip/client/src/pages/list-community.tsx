import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES, PLATFORMS } from "@/lib/mock-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Hexagon, Globe, User } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  platform: z.string(),
  inviteLink: z.string().url("Please enter a valid URL."),
  category: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters."),
  tags: z.string(),
  visibility: z.enum(["public", "boys-only", "girls-only"]),
  isAdmin: z.boolean().refine(val => val === true, "You must be an admin to list a community."),
});

export default function ListCommunity() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tags: "",
      description: "",
      inviteLink: "",
      visibility: "public",
      isAdmin: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Community Submitted!",
      description: "Your community is now pending review and will be listed shortly.",
      className: "bg-[#1A1A1A] border-[#FFC400] text-white",
    });
    console.log(values);
  }

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-16 max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-6 bg-[#FFC400]/20 rounded-full">
             <Hexagon className="w-6 h-6 text-[#FFC400]" />
          </div>
          <h1 className="text-4xl font-black font-heading mb-4 uppercase tracking-tight text-black">List Your Community</h1>
          <p className="text-lg text-black/70">Share your group with thousands of students.</p>
        </div>

        <Card className="border-black/20 bg-white rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FFC400] to-[#FF8C00]"></div>
          <CardHeader className="p-8 border-b border-black/10">
            <CardTitle className="text-xl font-bold uppercase tracking-wider text-black">Community Details</CardTitle>
            <CardDescription className="text-black/60">Please provide accurate information about your community.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem className="bg-gradient-to-r from-[#FFC400]/10 to-[#FF8C00]/10 border-2 border-[#FFC400]/30 p-6 rounded-2xl">
                      <FormLabel className="uppercase font-bold text-sm tracking-widest text-black flex items-center gap-2 mb-4">
                        <Globe className="h-4 w-4" />
                        Who can join this community?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <div className="flex items-center space-x-3 bg-white border-2 border-green-400/50 rounded-xl px-4 py-3 cursor-pointer hover:border-green-500 transition-colors">
                            <RadioGroupItem value="public" id="public" className="border-green-500 text-green-500" />
                            <Label htmlFor="public" className="font-bold text-black cursor-pointer flex items-center gap-2">
                              <Globe className="h-4 w-4 text-green-500" />
                              Public (Everyone)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 bg-white border-2 border-blue-400/50 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-500 transition-colors">
                            <RadioGroupItem value="boys-only" id="boys-only" className="border-blue-500 text-blue-500" />
                            <Label htmlFor="boys-only" className="font-bold text-black cursor-pointer flex items-center gap-2">
                              <User className="h-4 w-4 text-blue-500" />
                              Boys Only
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 bg-white border-2 border-pink-400/50 rounded-xl px-4 py-3 cursor-pointer hover:border-pink-500 transition-colors">
                            <RadioGroupItem value="girls-only" id="girls-only" className="border-pink-500 text-pink-500" />
                            <Label htmlFor="girls-only" className="font-bold text-black cursor-pointer flex items-center gap-2">
                              <User className="h-4 w-4 text-pink-500" />
                              Girls Only
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-bold text-xs tracking-widest text-black/70">Community Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. SRM Coding Wizards" {...field} className="bg-gray-50 border-black/20 h-12 text-black placeholder:text-black/40 focus:border-[#FFC400] rounded-2xl focus:shadow-[0_0_15px_rgba(255,196,0,0.2)]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase font-bold text-xs tracking-widest text-black/70">Platform</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 border-black/20 h-12 text-black focus:ring-[#FFC400] focus:border-[#FFC400] rounded-2xl focus:shadow-[0_0_15px_rgba(255,196,0,0.2)]">
                              <SelectValue placeholder="Select platform" className="text-black" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-black/20 text-black">
                            {PLATFORMS.map(p => <SelectItem key={p} value={p} className="focus:bg-[#FFC400] focus:text-black uppercase font-bold text-xs tracking-wider">{p}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase font-bold text-xs tracking-widest text-black/70">Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 border-black/20 h-12 text-black focus:ring-[#FFC400] focus:border-[#FFC400] rounded-2xl focus:shadow-[0_0_15px_rgba(255,196,0,0.2)]">
                              <SelectValue placeholder="Select category" className="text-black" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-black/20 text-black">
                             {CATEGORIES.map(c => <SelectItem key={c} value={c} className="focus:bg-[#FFC400] focus:text-black uppercase font-bold text-xs tracking-wider">{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="inviteLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-bold text-xs tracking-widest text-black/70">Invite Link</FormLabel>
                      <FormControl>
                        <Input placeholder="https://chat.whatsapp.com/..." {...field} className="bg-gray-50 border-black/20 h-12 text-black placeholder:text-black/40 focus:border-[#FFC400] rounded-2xl focus:shadow-[0_0_15px_rgba(255,196,0,0.2)]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-bold text-xs tracking-widest text-black/70">Tags (comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="coding, tech, beginners" {...field} className="bg-gray-50 border-black/20 h-12 text-black placeholder:text-black/40 focus:border-[#FFC400] rounded-2xl focus:shadow-[0_0_15px_rgba(255,196,0,0.2)]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-bold text-xs tracking-widest text-black/70">Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us what your community is about..." className="resize-none bg-gray-50 border-black/20 min-h-[120px] text-black placeholder:text-black/40 focus:border-[#FFC400] rounded-2xl focus:shadow-[0_0_15px_rgba(255,196,0,0.2)]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isAdmin"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-4 space-y-0 border-2 border-black/10 bg-gray-50 p-6 rounded-2xl">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-[#FFC400] data-[state=checked]:text-black data-[state=checked]:border-[#FFC400] border-black/30 w-5 h-5 mt-1 rounded"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base font-bold text-black">
                          I am an admin/mod of this group
                        </FormLabel>
                        <FormDescription className="text-black/60">
                          You confirm that you have the right to share this invite link.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-black text-lg h-14 uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-xl transition-all mt-4">
                  Submit Community
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
