import { redirect } from "next/navigation";
export default async function index(){
    await redirect ("/home")
}