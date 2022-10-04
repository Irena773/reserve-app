from sqlalchemy import Column, Integer, String, DATETIME
from sqlalchemy.orm import relationship
from datetime import datetime
from api.db import Base

class SecondHand(Base):
    __tablename__ = "secondhands"

    id = Column(Integer, primary_key=True)
    reserve_time = Column(DATETIME,default=datetime.now())
    elapsed_time = Column(DATETIME,default=datetime.now())
    status = Column(String(1024))
