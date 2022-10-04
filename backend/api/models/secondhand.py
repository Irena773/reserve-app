from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from api.db import Base

class SecondHand(Base):
    __tablename__ = "secondhands"

    id = Column(Integer, primary_key=True)
    reserve_time = Column(String(1024))
    elapsed_time = Column(String(1024))
    status = Column(String(1024))
