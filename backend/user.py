from sqlalchemy import Column, Integer, String, Float, DateTime

from setting import Engine
from setting import Base


class User(Base):
    """
    ユーザモデル
    """

    __tablename__ = 'users'
    __table_args__ = {
        'comment': 'ユーザー情報のマスターテーブル'
    }

    # 受付番号
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    # 受付時間
    reserve_time = Column('reserve_time', Integer)
    # 経過時間
    elapsed_time = Column('elapsed_time', Integer)
    # ステータス
    status = Column('status', String(100))

if __name__ == "__main__":
    Base.metadata.create_all(bind=Engine)