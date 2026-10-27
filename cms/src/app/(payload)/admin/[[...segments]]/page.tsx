import configPromise from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const getParams = (params: Args['params']) =>
  params.then(({ segments }) => ({ segments: segments ?? [] }))

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({
    config: configPromise,
    params: getParams(params),
    searchParams,
  })

const Page = ({ params, searchParams }: Args) =>
  RootPage({
    config: configPromise,
    importMap,
    params: getParams(params),
    searchParams,
  })

export default Page