import Pagination from 'components/Pagination'
import Section from 'components/Section'
import { GameCard, FilterGames, GameCardInterface } from 'features/games'
import { fetchServerSide } from 'lib/fetchServerSide'
import s from './page.module.scss'

// revalidate data every 60sec
export const revalidate = 60

const CatalogPage = async ({ searchParams }: { searchParams: URLSearchParams }) => {
  const games = await fetchServerSide<GameCardInterface[]>({
    path: `/games/list?${new URLSearchParams(searchParams)}`,
    cache: 'no-cache',
  })

  return (
    <>
      <Section
        title={
          <>
            Каталог <span>(35430 игр)</span>
          </>
        }
      />

      <Section last>
        <div className={s.row}>
          <div className={s.columns2}>
            <FilterGames />
          </div>

          <div className={s.columns10}>
            <div className={s.list}>
              {games?.map((game, id) => (
                <GameCard {...game} key={id} />
              ))}
            </div>

            <Pagination currentPage={1} totalItems={5} itemsPerPage={4} />
          </div>
        </div>
      </Section>
    </>
  )
}

export default CatalogPage
