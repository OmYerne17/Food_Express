
const {NEXT_PUBLIC_USERNAME,NEXT_PUBLIC_PASSWORD} = process.env;
export const connectionStr = `mongodb+srv://${NEXT_PUBLIC_USERNAME}:${NEXT_PUBLIC_PASSWORD}@cluster0.5crd5.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0`;