from sqlalchemy import Column, Integer, String, DATETIME
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta, timezone
from api.db import Base


class SecondHand(Base):
    __tablename__ = "secondhands"

    id = Column(Integer, primary_key=True)
    JST = timezone(timedelta(hours=+9), 'JST')
    reserve_time = Column(DATETIME,default=datetime.now(JST))
    elapsed_time = Column(DATETIME,default=datetime.now(JST))
    status = Column(String(1024))
