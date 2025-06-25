import bcrypt from "bcrypt";

export const hashPassword = async (value : string , saltRounnd : number = 10) =>
  (await bcrypt.hash(value , saltRounnd));

export const comparePassword = async (value : string , hashPassword : string) => await bcrypt.compare(value , hashPassword);